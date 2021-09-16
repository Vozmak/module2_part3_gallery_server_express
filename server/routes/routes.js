"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const gallery_1 = require("../get/gallery");
const login_1 = require("../post/login");
function routes(app) {
    app.post('/authorization', (req, res) => {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let resBody = (0, login_1.login)(body);
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
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map