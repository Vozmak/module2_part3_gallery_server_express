"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");
const routes_1 = require("./routes/routes");
const logger_1 = require("./logger/logger");
const authorizationChecker_1 = require("./middleware/authorizationChecker");
const app = express();
const PORT = 2000;
const hostname = '127.0.0.1';
const swaggerDocument = YAML.load(`${__dirname}/swagger/swaggerAPI.yaml`);
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.all('*', authorizationChecker_1.authorizationChecker);
app.use(logger_1.logger);
app.use(express.static(`${__dirname}/gallery/images`));
app.use(fileUpload());
// app.use((req: Request, res:Response, next: NextFunction) => {
//   if (req.url !== '/authorization') {
//     if (!req.headers.authorization || req.headers.authorization !== 'token') {
//       res.writeHead(401);
//       res.end(JSON.stringify({
//         errorMessage: 'Unauthorized',
//       }));
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
(0, routes_1.routes)(app);
app.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
    (0, logger_1.logger)('Server start');
});
//# sourceMappingURL=server.js.map