import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const debounce = express();

debounce.use("/static", express.static(join(__dirname, "static")));

debounce.use((req, res, next) => {
    const { originalUrl } = req;
    if (!originalUrl.endsWith("/")) {
        res.redirect(301, originalUrl + "/");
    } else {
        next();
    }
});

debounce.use("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

export default debounce;