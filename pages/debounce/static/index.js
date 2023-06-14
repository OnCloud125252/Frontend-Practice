const api_url = "https://640ad5ee81d8a32198d1c6ae.mockapi.io/api/products";


var debounceSettings = {
    placeholder: "Search For Products",
    lengthLimit: 10,
    timeoutMs: 500,
    debugMode: false
};

const input = document.getElementById("inputBox");
const productsSelections = document.getElementById("productsSelections");
const timeoutTimeInput = document.getElementById("timeoutTime");
const suggestionLimitInput = document.getElementById("suggestionLimit");
const debugModeInput = document.getElementById("debugMode");
var timeoutVariable;

window.onload = () => {
    input.setAttribute("placeholder", "Search For Products");
};

timeoutTimeInput.addEventListener("input", (rawInput) => {
    log("Set suggestion timeout to: " + rawInput.target.value);
    return debounceSettings.timeoutMs = rawInput.target.value;
});
suggestionLimitInput.addEventListener("input", (rawInput) => {
    log("Set suggestion quantity limit to: " + rawInput.target.value);
    return debounceSettings.lengthLimit = rawInput.target.value;
});
debugModeInput.addEventListener("input", (rawInput) => {
    console.log("Set debug mode to: " + rawInput.target.checked);
    return debounceSettings.debugMode = rawInput.target.checked;
});

input.addEventListener("focus", () => {
    const previousSelections = [...productsSelections.children];

    if (debounceSettings.lengthLimit < previousSelections.length) {
        productsSelections.innerHTML = "";
        for (var i = 0; i < debounceSettings.lengthLimit; i++) {
            productsSelections.appendChild(previousSelections[i]);
        }
    }

    searchProducts(input.value);
    return productsSelections.style = "";
});
input.addEventListener("blur", () => {
    setTimeout(() => {
        return productsSelections.style = "display: none;";
    }, 150);
});

input.addEventListener("input", (rawInput) => {
    const inputValue = rawInput.target.value;
    searchProducts(inputValue);
});


function searchProducts(inputValue) {
    clearTimeout(timeoutVariable);

    if (input.value.length === 0) {
        log("Search bar is empty");
        return productsSelections.innerHTML = "";
    };

    timeoutVariable = setTimeout(async () => {
        log(`Search for: ${inputValue}\nSelections Limit: ${debounceSettings.lengthLimit}`);
        var productsList = await api(api_url);
        productsList = productsList
            .map(product => product.name)
            .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()))
            .sort((a, b) => a.length - b.length)
            .sort((a, b) => a.toLowerCase().indexOf(inputValue.toLowerCase()) - b.toLowerCase().indexOf(inputValue.toLowerCase()));

        log(productsList);

        productsList = productsList.map(productName => `<li class="selection allowed" onclick="setInput(this.textContent)">${productName}</li>`);

        if (input.value.length !== 0 && productsList.length === 0) {
            log("No search result");
            productsSelections.innerHTML = `<li class="selection not_allowed">No Result</li>`;
        }
        else {
            productsList.length = debounceSettings.lengthLimit;
            productsSelections.innerHTML = productsList.join("");
        };
    }, debounceSettings.timeoutMs);
}

async function api(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });

    return await response.json();
}

function log(message) {
    if (debounceSettings.debugMode) {
        console.log(message);
    };
}

function setInput(text) {
    input.value = text;
    input.focus();
    return productsSelections.innerHTML = "";
}

function setTimeoutValue(thisElement, nextElement) {
    const seconds = Math.floor(thisElement.value / 1000);
    const milliseconds = Math.floor((thisElement.value % 1000) / 100);
    return nextElement.value = seconds + (milliseconds === 0 ? "" : ("." + milliseconds)) + "s";
}