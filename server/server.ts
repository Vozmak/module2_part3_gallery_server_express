import * as express from 'express';
import * as cors from 'cors';
const app = express();
import { routes } from './routes/routes';

const PORT: number = 2000;
const hostname: string = '127.0.0.1';

app.use(cors({
  origin: '*',
}))

routes(app);

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`)
});
