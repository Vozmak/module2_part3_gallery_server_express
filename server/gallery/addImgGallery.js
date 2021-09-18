"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImgGallery = void 0;
const fs = require("fs");
async function addImgGallery(req) {
    const formData = req.files;
    const page = req.params.page || '1';
    if (!formData || Object.keys(formData).length === 0) {
        return {
            errorMessage: 'Нет изображений для загрузки'
        };
    }
    let imgData = formData.photo;
    let responseImg = [];
    if (Array.isArray(imgData)) {
        for (const imgInfo of imgData) {
            try {
                await fs.writeFile(`server/gallery/images/${page}/${imgInfo.name}`, imgInfo.data, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                responseImg.push(imgInfo.name);
            }
            catch (e) {
                console.log(e);
                responseImg.push(`${imgInfo.name} не было загружено`);
            }
        }
    }
    else {
        try {
            await fs.writeFile(`server/gallery/images/${page}/${imgData.name}`, imgData.data, (err) => {
                if (err) {
                    throw err;
                }
            });
            responseImg.push(imgData.name);
        }
        catch (e) {
            console.log(e);
            return {
                errorMessage: 'Ошибка загрузки'
            };
        }
    }
    return {
        message: 'Изображения успешно загружены',
        objects: responseImg,
    };
}
exports.addImgGallery = addImgGallery;
//# sourceMappingURL=addImgGallery.js.map