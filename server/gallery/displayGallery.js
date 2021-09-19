"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayGallery = void 0;
const path = require("path");
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
async function displayGallery(req) {
    const total = (await readdir(`${__dirname}/images`)).length;
    const page = req.params.page || '1';
    if (isNaN(Number(page)) || Number(page) > total || Number(page) < 1) {
        return {
            errorMessage: 'Указаной страницы несуществует',
        };
    }
    const imgArray = await readdir(`${__dirname}/images/${page}`);
    const images = imgArray.map((img) => path.join(`../../server/gallery/images/${page}`, img));
    return {
        objects: images,
        page: page,
        total: total,
    };
}
exports.displayGallery = displayGallery;
// Infinity load
//# sourceMappingURL=displayGallery.js.map