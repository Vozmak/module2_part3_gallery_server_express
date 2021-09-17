import { Request } from 'express';

function addImgGallery(req: Request) {
  console.log(req.files);
}

export { addImgGallery }
