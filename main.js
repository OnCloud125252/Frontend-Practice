import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import split_view from "./pages/split-view/route.js";
import debounce from "./pages/debounce/route.js";
import index from "./pages/index/route.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const host = "0.0.0.0";
const port = 5000;

const main = express();

main.use("/global", express.static(join(__dirname, "global")));

main.use("/split-view", split_view);
main.use("/debounce", debounce);
main.use("/", index);

main.listen(port, host, () => {
    console.log(`Listening on port ${port}`)
});