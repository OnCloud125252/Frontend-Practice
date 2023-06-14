import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import split_view from "./pages/split-view/route.js";
import debounce from "./pages/debounce/route.js";
import index from "./pages/index/route.js";
import pure_css_button from "./pages/pure-css-button/route.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8080;

const main = express();

main.use("/global", express.static(join(__dirname, "global")));

main.use("/pure-css-button", pure_css_button);
main.use("/split-view", split_view);
main.use("/debounce", debounce);
main.use("/", index);

main.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});