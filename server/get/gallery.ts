import * as path from 'path';

import * as fs from 'fs';
import * as util from 'util';

const readdir = util.promisify(fs.readdir);

type LoginResponse = {
  errorMessage: string;
} | {
  objects: Array<string>;
  page: string;
  total: number;
}

async function displayGallery(req: any): Promise<LoginResponse> {
  if (req.headers.authorization === 'token') {
    const total: number = fs.readdirSync('./server/gallery/img').length;
    const page = <string>req.params.page || '1';

    if (isNaN(Number(page)) || Number(page) > total || Number(page) < 1) {
      return {
        errorMessage: 'Указаной страницы несуществует',
      };
    }

    const imgArray = await readdir(`./server/gallery/img/${page}`);
    const images = imgArray.map((img: string) => path.join(`../../server/gallery/img/${page}`, img));

    return {
      objects: images,
      page: page,
      total: total,
    };
  }

  return {
    errorMessage: 'Unauthorized',
  };
}

export { displayGallery };

// Infinity load
