function addSwitchThemeListener(event) {
    document.documentElement.setAttribute("data-theme", "dark");
    let themeSwitcher = document.getElementById("toggle-label");
    themeSwitcher.onclick = function () {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let switchToTheme = currentTheme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", switchToTheme);
    }
}

function addSideBarClickListener(event) {
    function toggleSideBar() {
        if (sidebar.classList.contains("sidebarHidden")) {
            sidebar.classList.remove("sidebarHidden")
        } else {
            sidebar.classList.add("sidebarHidden")

        }
    }
    const sidebar = document.getElementById("sidebar");
    const burger = document.getElementById("burger-icon")
    const close = document.getElementById("close-icon")
    close.onclick = toggleSideBar;
    burger.onclick = toggleSideBar;

}

function loadAllListeners(event) {
    addSwitchThemeListener(event)
    addSideBarClickListener(event)
}


document.addEventListener("DOMContentLoaded", loadAllListeners);

