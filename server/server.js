"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const login_js_1 = require("./post/login.js");
const gallery_1 = require("./get/gallery");
const PORT = 2000;
const hostname = '127.0.0.1';
app.use(cors({
    origin: '*',
}));
app.post('/authorization', (req, res) => {
    let body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        let resBody = (0, login_js_1.login)(body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(resBody));
    });
});
app.get('/gallery/:page', async (req, res) => {
    let gallery = await (0, gallery_1.displayGallery)(req);
    if ("errorMessage" in gallery && gallery.errorMessage) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(401);
        res.end(JSON.stringify(gallery));
        return;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(gallery));
});
app.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
});
//# sourceMappingURL=server.js.map