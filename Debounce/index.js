const api_url = "https://640ad5ee81d8a32198d1c6ae.mockapi.io/api/products";


var settings = {
    placeholder: "Search For Products",
    lengthLimit: 5,
    timeoutMs: 500
};

const input = document.getElementById("inputBox");
const productsSelections = document.getElementById("productsSelections");
var timeoutVariable;

window.onload = () => {
    input.focus();
    input.setAttribute("placeholder", "Search For Products");
};

input.addEventListener("focus", () => {
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

    const lengthLimit = settings.lengthLimit ?? 10;
    const timeoutMs = settings.timeoutMs ?? 500;

    if (input.value.length === 0) {
        console.log("Search bar is empty");
        return productsSelections.innerHTML = "";
    };

    timeoutVariable = setTimeout(async () => {
        console.log("User search for: " + inputValue);
        var productsList = await api(api_url);
        productsList = productsList
            .map(product => product.name)
            .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()))
            .sort((a, b) => a.length - b.length)
            .sort((a, b) => a.toLowerCase().indexOf(inputValue.toLowerCase()) - b.toLowerCase().indexOf(inputValue.toLowerCase()));

        productsList = productsList.map(productName => `<li class="selection allowed" onclick="setInput(this.textContent)">${productName}</li>`);

        if (input.value.length !== 0 && productsList.length === 0) {
            console.log("No search result");
            productsSelections.innerHTML = `<li class="selection not_allowed">No Result</li>`;
        }
        else {
            productsList.length = lengthLimit;
            productsSelections.innerHTML = productsList.join("");
        };
    }, timeoutMs);
}

function setInput(text) {
    input.value = text;
    input.focus();
    return productsSelections.innerHTML = "";
}

async function api(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });

    return await response.json();
}