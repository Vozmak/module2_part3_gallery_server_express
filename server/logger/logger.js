"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs = require("fs");
function logger(reqOrMsg, res, next) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const date = new Date();
    const logDate = `${date.toLocaleDateString('ru-RU', options)}.${date.getMilliseconds()}`;
    let log;
    if (typeof reqOrMsg === 'string') {
        log = `Ответ сервера - ${logDate}: ${reqOrMsg}\n\n`;
    }
    else {
        log = `Запрос на сервер - ${logDate}: Method - ${reqOrMsg.method}; 
        URL - ${reqOrMsg.url}; 
        Body - ${JSON.stringify(reqOrMsg.body)}; 
        Headers - ${JSON.stringify(reqOrMsg.headers)}\n\n`;
    }
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