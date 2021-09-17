"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const routes_1 = require("./routes/routes");
const app = express();
const PORT = 2000;
const hostname = '127.0.0.1';
const swaggerDocument = YAML.load(`${__dirname}/swagger/swaggerAPI.yaml`);
app.use(cors({
    origin: '*',
}));
app.use('/images/:page', (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization !== 'token') {
        res.writeHead(401);
        res.end(JSON.stringify({
            errorMessage: 'Unauthorized'
        }));
    }
    else {
        next();
    }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
(0, routes_1.routes)(app);
app.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
});
//# sourceMappingURL=server.js.map