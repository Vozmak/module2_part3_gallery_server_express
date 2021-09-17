import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { displayGallery } from '../gallery/gallery';
import { login } from '../login/login';

function routes (app: core.Express) {
  app.post('/authorization', (req: Request, res: Response) => {
    let body: string = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      let resBody = login(body);
      res.setHeader('Access-Control-Allow-Origin', '*');
      if ("errorMessage" in resBody && resBody.errorMessage) {
        res.writeHead(406);
      }
      res.end(JSON.stringify(resBody));
    });
  })

  app.get('/gallery/:page', async (req: Request, res: Response) => {
    let gallery = await displayGallery(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    if ("errorMessage" in gallery && gallery.errorMessage) {
      res.writeHead(404);
      res.end(JSON.stringify(gallery));
      return;
    }
    res.end(JSON.stringify(gallery));
  });
}

export {routes}
