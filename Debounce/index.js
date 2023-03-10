const api_host = "https://640ad5ee81d8a32198d1c6ae.mockapi.io";


const input = document.getElementById("searchBox");
var timeout;
input.addEventListener("input", (rawInput) => {
    const input = rawInput.target.value;
    clearTimeout(timeout);
    if (input === "") return;
    timeout = setTimeout(async () => {
        var productsList = await api("products");
        productsList = productsList
            .map(product => product.name)
            .filter(name => name.toLowerCase().includes(input))
            .sort((a, b) => a.length - b.length)
            .sort((a, b) => a.toLowerCase().indexOf(input) - b.toLowerCase().indexOf(input));

        console.log(productsList.join("\n"));
    }, 800);
});

async function api(route) {
    const response = await fetch(api_host + "/api/" + route, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });

    return await response.json();
}