// Import Hugo params:
// - followtitle
// - followdescription
// - followbutton
import * as params from "@params";
import './lightbox'

let timeOutForm, connectRequestTimeOut
const latteTheme = "latte-theme"

function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; path=/; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ""}${expires};`;
}

function getCookie(name) {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		if (cookie.indexOf(`${name}=`) > -1) {
			return cookie.split("=")[1];
		}
	}
	return null;
}

function switchTheme(currentTheme) {
	nextThemeState = currentTheme === "dark" ? "light" : "dark";
	localStorage.setItem(latteTheme, nextThemeState);
	document.documentElement.setAttribute("data-theme", nextThemeState);
}

function getOrSetCurrentTheme() {
	if (!localStorage.getItem(latteTheme)) {
		localStorage.setItem(latteTheme, "light");
		// default value for theme is light
		return "light";
	}
	return localStorage.getItem(latteTheme);
}

function addSwitchThemeListener(event) {
	const currentTheme = getOrSetCurrentTheme();
	document.documentElement.setAttribute("data-theme", currentTheme);
	const themeSwitcher = document.getElementById("toggle-label");
	const inputSwitch = document.getElementById("toggle-switch");
	inputSwitch.checked = "dark" === currentTheme;
	themeSwitcher.onclick = () => {
		switchTheme(getOrSetCurrentTheme());
		inputSwitch.checked = "light" === localStorage.getItem(latteTheme);
	};
}

function addSideBarClickListener(event) {
	const sidebar = document.getElementById("sidebar");
	const burger = document.getElementById("burger-icon");
	const close = document.getElementById("close-icon");

	function toggleSideBar() {
		if (sidebar.classList.contains("sidebarHidden")) {
			sidebar.classList.remove("sidebarHidden");
			burger.setAttribute("aria-expanded", true);
		} else {
			sidebar.classList.add("sidebarHidden");
			burger.setAttribute("aria-expanded", false);
		}
	}
	close.onclick = toggleSideBar;
	burger.onclick = toggleSideBar;
}

function addScrolltoTopListener(event) {
	const scrollUp = document.getElementById("scroll-up");
	let eventTimeout;
	window?.addEventListener("scroll", setCurrentPosition);
	function setCurrentPosition() {
		if (!eventTimeout) {
			eventTimeout = setTimeout(() => {
				eventTimeout = null;
				if (window?.scrollY < 400) {
					scrollUp.classList.add("hidden");
				} else {
					scrollUp.classList.remove("hidden");
				}
			}, 400);
		}
	}

	function scrollToTop() {
		window?.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	scrollUp.onclick = scrollToTop;
}


function sendEventToGA(event) {
	try {
		if (typeof ga === "function") {
			ga("set", "location", event?.data?.url);
			ga("send", "pageview");
		}
	} catch (e) {
		console.error(e)
	}
}

function updateLangTag(event) {
	const meta = document.querySelector("meta[name=language]");
	const htmlTag = document.querySelector("html");
	const language = meta.getAttribute("content");
	htmlTag.setAttribute("lang", language);
	document.documentElement.setAttribute("lang", language);
}

function addCopyButtonToCodeBlocks(event) {
	document.querySelectorAll('pre code').forEach((block) => {
		const button = document.createElement('button');
		button.className = 'copy-button';
		button.textContent = 'Copy';
		button.addEventListener('click', () => {
			const range = document.createRange();
			range.selectNodeContents(block);
			const selection = window?.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			document.execCommand('copy');
			button.textContent = 'Copied!';
			setTimeout(() => { button.textContent = 'Copy'; }, 2000);
		});
		block.parentNode.insertBefore(button, block);
	});
}

function connectRequest(event) {
	if (params?.followTitle && params?.followDescription && !getCookie("connect_request_shown") && params?.followRequestDelay > 0 && !timeOutForm) {
		return setTimeout(() => {
			setCookie("connect_request_shown", true, 7)
			Swal.fire({
				title: params?.followTitle,
				html: params?.followDescription,
				icon: 'success',
				showCloseButton: true,
				showConfirmButton: false,
				background: window?.getComputedStyle(document.body).getPropertyValue('--background'),
				color: window?.getComputedStyle(document.body).getPropertyValue('--main-text'),
			})
		}, params?.followRequestDelay * 1000)
	}
}

function loadAllListeners(event) {
	sendEventToGA(event);
	addSwitchThemeListener(event);
	addSideBarClickListener(event);
	addScrolltoTopListener(event);
	addCopyButtonToCodeBlocks(event);
	updateLangTag(event);
	connectRequestTimeOut = connectRequest(event);
}

function clearTimers(events) {
	clearTimeout(timeOutForm);
	clearTimeout(connectRequestTimeOut);
}

// Each time one of these events occur you can restart the timeout for popups and reload the listeners
// if not loaded theme switch won't work on ajax requests, include changing pages
["DOMContentLoaded", "htmx:afterSettle", "htmx:historyRestore"].forEach(event => {
	loadAllListeners(); document.addEventListener(event, clearTimers); document.addEventListener(event, loadAllListeners)
});
