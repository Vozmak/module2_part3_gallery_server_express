import {NextFunction, Request, Response} from "express";
import * as fs from "fs";
import ErrnoException = NodeJS.ErrnoException;

function logger(req: Request, res: Response, next?: NextFunction) {
    const log: string = `${new Date()}: Method - ${req.method}; URL - ${req.url}; Body - ${JSON.stringify(req.body)}; Headers - ${JSON.stringify(req.headers)}\n`;
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