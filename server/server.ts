import * as express from 'express';
import * as cors from 'cors';
import {Request, Response} from 'express';
const app = express();
import { login } from './post/login.js';
import { displayGallery } from './get/gallery';

const PORT: number = 2000;
const hostname: string = '127.0.0.1';

app.use(cors({
  origin: '*',
}))

app.post('/authorization', (req: Request, res: Response) => {
  let body: string = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    let resBody = login(body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(resBody));
  });
})

app.get('/gallery/:page', async (req: Request, res: Response) => {
  let gallery = await displayGallery(req);
  if ("errorMessage" in gallery && gallery.errorMessage) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(401);
    res.end(JSON.stringify(gallery));
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(gallery));
});

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`)
});
