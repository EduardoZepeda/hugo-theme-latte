function setCookie(name, value, days) {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; path=/; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + ';'
}

function getCookie(name) {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        if (cookie.indexOf(name + '=') > -1) {
            return cookie.split('=')[1]
        }
    }
    return null
}

function addSwitchThemeListener(event) {
    let themeSwitcher = document.getElementById("toggle-label")
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let inputSwitch = document.getElementById("toggle-switch")
    inputSwitch.checked = "dark" === currentTheme
    themeSwitcher.onclick = function () {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let switchToTheme = currentTheme === "dark" ? "light" : "dark"
        inputSwitch.checked = "dark" === currentTheme
        document.documentElement.setAttribute("data-theme", switchToTheme)
    }
}

function addSideBarClickListener(event) {
    const sidebar = document.getElementById("sidebar")
    const burger = document.getElementById("burger-icon")
    const close = document.getElementById("close-icon")
    function toggleSideBar() {
        if (sidebar.classList.contains("sidebarHidden")) {
            sidebar.classList.remove("sidebarHidden")
            burger.setAttribute("aria-expanded", true)
        } else {
            sidebar.classList.add("sidebarHidden")
            burger.setAttribute("aria-expanded", false)
        }
    }
    close.onclick = toggleSideBar
    burger.onclick = toggleSideBar

}

function addScrolltoTopListener(event) {
    const scrollUp = document.getElementById("scroll-up")
    let eventTimeout
    window?.addEventListener('scroll', setCurrentPosition)
    function setCurrentPosition() {
        if (!eventTimeout) {
            eventTimeout = setTimeout(() => {
                eventTimeout = null
                if (window?.scrollY < 400) {
                    scrollUp.classList.add("hidden")
                } else {
                    scrollUp.classList.remove("hidden")
                }

            }, 400)
        }
    }

    function scrollToTop() {
        window?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    scrollUp.onclick = scrollToTop
}

function addSubscribeFormListener(event) {
    const subscribeForm = document.getElementById("subscribe-form-modal")
    const subscribeFormBody = document.getElementById("subscribe-form-body")
    const close = document.getElementById("subscribe-form-close-icon")
    const showFormButton = document.getElementById("show-subscribe-form")
    function closeSubscribeForm() {
        subscribeForm.classList.add("display-none")
        setCookie("mail_chimp_subscribe_shown", true, 7)
    }
    function toggleSubscribeFormBody() {
        if (subscribeFormBody.classList.contains("display-none")) {
            subscribeFormBody.classList.remove("display-none")
        } else {
            subscribeFormBody.classList.add("display-none")
        }
    }
    close.onclick = closeSubscribeForm
    showFormButton.onclick = toggleSubscribeFormBody
}

function setSubscribeFormTimeout(event) {
    setTimeout(function () {
        const subscribeForm = document.getElementById("subscribe-form-modal")
        subscribeForm.classList.remove("display-none")
    }, 7500)
}

function loadAllListeners(event) {
    addSwitchThemeListener(event)
    addSideBarClickListener(event)
    addScrolltoTopListener(event)
    addSubscribeFormListener(event)
    if (!getCookie("mail_chimp_subscribe_shown")) {
        setSubscribeFormTimeout(event)
    }
}


document.addEventListener("turbolinks:load", loadAllListeners)
