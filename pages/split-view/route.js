import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const split_view = express();

split_view.use("/static", express.static(join(__dirname, "static")));

split_view.use((req, res, next) => {
    const { originalUrl } = req;
    if (!originalUrl.endsWith("/")) {
        res.redirect(301, originalUrl + "/");
    } else {
        next();
    }
});

split_view.use("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

export default split_view;