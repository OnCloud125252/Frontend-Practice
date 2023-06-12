import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const pure_css_button = express();

pure_css_button.use("/static", express.static(join(__dirname, "static")));

pure_css_button.use((req, res, next) => {
    const { originalUrl } = req;
    if (!originalUrl.endsWith("/")) {
        res.redirect(301, originalUrl + "/");
    } else {
        next();
    }
});

pure_css_button.use("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

export default pure_css_button;