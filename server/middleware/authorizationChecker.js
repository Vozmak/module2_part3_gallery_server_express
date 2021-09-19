"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const logger_1 = require("../logger/logger");
function authorizationChecker(req, res, next) {
    if (/gallery/.test(req.url)) {
        if (!req.headers.authorization) {
            res.writeHead(401);
            res.end(JSON.stringify({
                errorMessage: 'No authorization',
            }));
            (0, logger_1.logger)('No Authorization');
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}
exports.authorizationChecker = authorizationChecker;
//# sourceMappingURL=authorizationChecker.js.map