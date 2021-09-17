"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const addImgGallery_1 = require("../gallery/addImgGallery");
const displayGallery_1 = require("../gallery/displayGallery");
const login_1 = require("../login/login");
function routes(app) {
    app.post('/authorization', (req, res) => {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            const resBody = (0, login_1.login)(body);
            if ("errorMessage" in resBody && resBody.errorMessage) {
                res.writeHead(406);
            }
            res.end(JSON.stringify(resBody));
        });
    });
    app.get('/gallery/:page', async (req, res) => {
        let gallery = await (0, displayGallery_1.displayGallery)(req);
        if ("errorMessage" in gallery && gallery.errorMessage) {
            res.writeHead(404);
            res.end(JSON.stringify(gallery));
            return;
        }
        res.end(JSON.stringify(gallery));
    });
    app.post('/gallery/:page', (req, res) => {
        const response = (0, addImgGallery_1.addImgGallery)(req);
        res.end(JSON.stringify({
            message: 'Успешно'
        }));
    });
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map