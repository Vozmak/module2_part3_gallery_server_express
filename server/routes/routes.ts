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

      errorMessage(res, resBody, 406);

      res.end(JSON.stringify(resBody));
    });
  })

  app.get('/gallery/:page', async (req: Request, res: Response) => {
    let gallery = await displayGallery(req);

    errorMessage(res, gallery, 404);

    res.end(JSON.stringify(gallery));
  });

  app.post('/gallery/:page', async (req: Request, res: Response) => {
    const upload = await addImgGallery(req);

    errorMessage(res, upload, 400);

    res.end(JSON.stringify(upload));
  });
}

function errorMessage(res: Response, body: any, code: number): void {
  if ("errorMessage" in body && body.errorMessage) {
    res.writeHead(code);
  }
}

export {routes}