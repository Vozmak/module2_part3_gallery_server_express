"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const routes_1 = require("./routes/routes");
const PORT = 2000;
const hostname = '127.0.0.1';
app.use(cors({
    origin: '*',
}));
(0, routes_1.routes)(app);
app.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
});
//# sourceMappingURL=server.js.map