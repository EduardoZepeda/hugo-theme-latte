// Import Hugo params:
// - modalcountdown
import * as params from "@params";
import "./lightbox";
// Turbolinks needs to be imported and its start method be called for it to fire the listening events
import Turbolinks from "./turbolinks.min";

Turbolinks.start();

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
	localStorage.setItem("coffee-byes-theme", nextThemeState);
	document.documentElement.setAttribute("data-theme", nextThemeState);
}

function getOrSetCurrentTheme() {
	if (!localStorage.getItem("coffee-byes-theme")) {
		localStorage.setItem("coffee-byes-theme", "dark");
		// default value for theme is dark
		return "dark";
	}
	return localStorage.getItem("coffee-byes-theme");
}

function addSwitchThemeListener(event) {
	const currentTheme = getOrSetCurrentTheme();
	document.documentElement.setAttribute("data-theme", currentTheme);
	const themeSwitcher = document.getElementById("toggle-label");
	const inputSwitch = document.getElementById("toggle-switch");
	inputSwitch.checked = "dark" === currentTheme;
	themeSwitcher.onclick = () => {
		switchTheme(getOrSetCurrentTheme());
		inputSwitch.checked = "light" === localStorage.getItem("coffee-byes-theme");
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

function addSubscribeFormListener(event) {
	// If there is no subscribeBanner defined in config.toml at root queries will return null so we catch the error
	try {
		const subscribeForm = document.getElementById("subscribe-form-modal");
		const subscribeFormBody = document.getElementById("subscribe-form-body");
		const close = document.getElementById("subscribe-form-close-icon");
		const showFormButton = document.getElementById("show-subscribe-form");
		const closeButton = document.getElementById("subscribe-close-button");
		function closeSubscribeForm() {
			subscribeForm.classList.add("display-none");
			// If user closes banner stop showing the banner for 7 days
			setCookie("mail_chimp_subscribe_shown", true, 7);
		}
		function toggleSubscribeFormBody() {
			if (subscribeFormBody.classList.contains("display-none")) {
				subscribeFormBody.classList.remove("display-none");
			} else {
				subscribeFormBody.classList.add("display-none");
			}
		}
		closeButton.onclick = closeSubscribeForm;
		close.onclick = closeSubscribeForm;
		showFormButton.onclick = toggleSubscribeFormBody;
	} catch (e) {
		return null
	}
}

function setSubscribeFormTimeout(event) {
	setTimeout(() => {
		const subscribeForm = document.getElementById("subscribe-form-modal");
		subscribeForm.classList.remove("display-none");
	}, params.modalcountdown);
}

function sendEventToGA(event) {
	// Make sure google analytics send data on turbolinks load
	if (typeof ga === "function") {
		ga("set", "location", event.data.url);
		ga("send", "pageview");
	}
}

function updateLangTag(event) {
	// by default turbolinks doesn't change the html lang attribute
	// so it must be done manually
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
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			document.execCommand('copy');
			button.textContent = 'Copied!';
			setTimeout(() => { button.textContent = 'Copy'; }, 2000);
		});
		block.parentNode.insertBefore(button, block);
	});
}

function loadAllListeners(event) {
	sendEventToGA(event);
	addSwitchThemeListener(event);
	addSideBarClickListener(event);
	addScrolltoTopListener(event);
	addCopyButtonToCodeBlocks(event);
	addSubscribeFormListener(event);
	updateLangTag(event);
	if (!getCookie("mail_chimp_subscribe_shown") && params.modalcountdown > 0) {
		setSubscribeFormTimeout(event);
	}
}




document.addEventListener("turbolinks:load", loadAllListeners);
