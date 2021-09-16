import * as express from 'express';
import * as cors from 'cors';
const app = express();
import { routes } from './routes/routes';

const PORT: number = 2000;
const hostname: string = '127.0.0.1';

app.use(cors({
  origin: '*',
}));

app.use('/gallery/:page', (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization !== 'token') {
    res.writeHead(401);
    res.end(JSON.stringify({
      errorMessage: 'Unauthorized'
    }));
  } else {
    next();
  }
});

routes(app);

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`)
});
