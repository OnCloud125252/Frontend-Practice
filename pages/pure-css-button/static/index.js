var pure_css_buttonSettings = {
    lightTheme: false,
    hoverLayer: false,
    hoverBox: false
}

const background = document.getElementById("background");
const hoverLayerInput = document.getElementById("hoverLayer");
const hoverLayer = document.getElementsByClassName("hoverLayer");
const hoverBoxInput = document.getElementById("hoverBox");
const hoverBoxes = document.getElementsByName("hoverBox");

hoverLayerInput.addEventListener("change", (input) => {
    pure_css_buttonSettings.hoverLayer = input.target.checked;
    pure_css_buttonSettings.hoverLayer ? hoverLayer[0].classList.add("showHoverLayer") : hoverLayer[0].classList.remove("showHoverLayer");
})

hoverBoxInput.addEventListener("change", (input) => {
    pure_css_buttonSettings.hoverBox = input.target.checked;
    hoverBoxes.forEach(box => {
        pure_css_buttonSettings.hoverBox ? box.classList.add("showHoverBox") : box.classList.remove("showHoverBox");
    });
});

function toggleTheme() {
    if (pure_css_buttonSettings.lightTheme) {
        background.classList.replace("light", "dark");
    } else if (!pure_css_buttonSettings.lightTheme) {
        background.classList.replace("dark", "light");
    }
    pure_css_buttonSettings.lightTheme = !pure_css_buttonSettings.lightTheme;
}