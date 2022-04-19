function addSwitchThemeListener(event) {
    document.documentElement.setAttribute("data-theme", "dark")
    let themeSwitcher = document.getElementById("toggle-label")
    themeSwitcher.onclick = function () {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let switchToTheme = currentTheme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", switchToTheme);
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

function loadAllListeners(event) {
    addSwitchThemeListener(event)
    addSideBarClickListener(event)
    addScrolltoTopListener(event)
}


document.addEventListener("DOMContentLoaded", loadAllListeners);

