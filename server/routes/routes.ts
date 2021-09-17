import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { addImgGallery } from '../gallery/addImgGallery';
import { displayGallery } from '../gallery/displayGallery';
import { login } from '../login/login';

function routes (app: core.Express): void {
  app.post('/authorization', (req: Request, res: Response) => {
    let body: string = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const resBody = login(body);
      if ("errorMessage" in resBody && resBody.errorMessage) {
        res.writeHead(406);
      }
      res.end(JSON.stringify(resBody));
    });
  })

  app.get('/gallery/:page', async (req: Request, res: Response) => {
    let gallery = await displayGallery(req);
    if ("errorMessage" in gallery && gallery.errorMessage) {
      res.writeHead(404);
      res.end(JSON.stringify(gallery));
      return;
    }
    res.end(JSON.stringify(gallery));
  });

  app.post('/gallery/:page', (req: Request, res: Response) => {
    const response = addImgGallery(req);

    res.end(JSON.stringify({
      message: 'Успешно'
    }));
  });
}

export {routes}
