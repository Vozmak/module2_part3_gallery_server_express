import {NextFunction, Request, Response} from "express";
import ErrnoException = NodeJS.ErrnoException;
import * as fs from "fs";

function logger(message: string): void;
function logger(req: Request, res?: Response, next?: NextFunction): void;
function logger(reqOrMsg: Request | string, res?: Response, next?: NextFunction): void {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const date = new Date();
    const logDate = `${date.toLocaleDateString('ru-RU', options)}.${date.getMilliseconds()}`

    let log: string;

    if (typeof reqOrMsg === 'string') {
        log = `Ответ сервера - ${logDate}: ${reqOrMsg}\n\n`;
    } else {
        log = `Запрос на сервер - ${logDate}: Method - ${reqOrMsg.method}; 
        URL - ${reqOrMsg.url}; 
        Body - ${JSON.stringify(reqOrMsg.body)}; 
        Headers - ${JSON.stringify(reqOrMsg.headers)}\n\n`;
    }

    fs.appendFile(`${__dirname}/log.txt`, log, (err: ErrnoException | null) => {
        if (err) {
            console.log(err)
        }
    });

    if (next) {
        next();
    }
}

export { logger }