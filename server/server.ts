import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as fileUpload from 'express-fileupload';
import { routes } from './routes/routes'

const app = express();
const PORT: number = 2000;
const hostname: string = '127.0.0.1';
const swaggerDocument = YAML.load(`${__dirname}/swagger/swaggerAPI.yaml`);

app.use(cors({
  origin: '*',
}));
app.use((req: Request, res:Response, next: NextFunction) => {
  if (req.url !== '/authorization') {
    if (!req.headers.authorization || req.headers.authorization !== 'token') {
      res.writeHead(401);
      res.end(JSON.stringify({
        errorMessage: 'Unauthorized',
      }));
    } else {
      next();
    }
  } else {
    next();
  }
});
app.use(fileUpload())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`);
});
