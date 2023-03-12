import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const index = express();

index.use("/static", express.static(join(__dirname, "static")));

index.use("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

export default index;