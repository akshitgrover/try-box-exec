import * as fs from 'fs';
import * as path from 'path';

export const writeFile = (content: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const cb = (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    }
    const filePath: string = path.join(__dirname, '../uploads/code');
    _writeFile(content, filePath, cb);
  });
}

const _writeFile = (content: string, filePath: string, cb) => {
  fs.writeFile(filePath, content, { encoding: 'utf8', flag: 'w+' }, cb);
}
