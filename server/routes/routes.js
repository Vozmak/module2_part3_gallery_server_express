"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const addImgGallery_1 = require("../gallery/addImgGallery");
const displayGallery_1 = require("../gallery/displayGallery");
const login_1 = require("../login/login");
const logger_1 = require("../logger/logger");
function routes(app) {
    app.post('/authorization', (req, res) => {
        const resBody = (0, login_1.login)(req);
        errorMessage(res, resBody, 406);
        res.end(JSON.stringify(resBody));
    });
    app.get('/gallery/:page', async (req, res) => {
        let gallery = await (0, displayGallery_1.displayGallery)(req);
        errorMessage(res, gallery, 404);
        res.end(JSON.stringify(gallery));
    });
    app.post('/gallery/:page', async (req, res) => {
        const upload = await (0, addImgGallery_1.addImgGallery)(req);
        errorMessage(res, upload, 400);
        res.end(JSON.stringify(upload));
    });
}
exports.routes = routes;
function errorMessage(res, body, code) {
    if ("errorMessage" in body && body.errorMessage) {
        res.writeHead(code);
    }
    (0, logger_1.logger)(JSON.stringify(body));
}
//# sourceMappingURL=routes.js.map