const background = document.getElementById("background");
let lightTheme = false;

function toggleTheme() {
    if (lightTheme) {
        background.classList.replace("light", "dark");
    } else if (!lightTheme) {
        background.classList.replace("dark", "light");
    }
    lightTheme = !lightTheme;
}