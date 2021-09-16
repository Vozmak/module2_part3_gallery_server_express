import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { displayGallery } from '../get/gallery';
import { login } from '../post/login';

function routes (app: core.Express) {
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
      res.writeHead(404);
      res.end(JSON.stringify(gallery));
      return;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(gallery));
  });
}

export {routes}
