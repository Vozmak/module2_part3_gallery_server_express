"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs = require("fs");
function logger(req, res, next) {
    const log = `${new Date()}: Method - ${req.method}; URL - ${req.url}; Body - ${JSON.stringify(req.body)}; Headers - ${JSON.stringify(req.headers)}\n`;
    fs.appendFile(`${__dirname}/log.txt`, log, (err) => {
        if (err) {
            console.log(err);
        }
    });
    if (next) {
        next();
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map