import * as fs from 'fs';
import * as path from 'path';

import { ExecEmitter } from 'box-exec';

const writeFile = (content: string, type: 'T' | 'C' = 'C'): Promise<string> => {
  return new Promise((resolve, reject) => {
    let name = (type == 'T')? 'testcase' : 'code';
    const cb = (err) => {
      if (err) {
        reject(err);
      }
      resolve(name);
    }
    const filePath: string = path.join(__dirname, `../uploads/${name}`);
    _writeFile(content, filePath, cb);
  });
};

const _writeFile = (content: string, filePath: string, cb) => {
  fs.writeFile(filePath, content, { encoding: 'utf8', flag: 'w+' }, cb);
};

const registerEvents = (box: ExecEmitter | null, cb: (err: Error) => void) => {
  if (box == null) {
    return;
  }
  /*
    Error event: Code/Testcase file is non-existent
  */
  box.on('fileError', (err: Error) => {
    box = null;
    cb(err);
  });
  /*
    Error event: handle invalid language key
  */
  box.on('langKeyError', (err: Error) => {
    box = null;
    cb(err);
  });
  /*
    Emited when box has all the inputs and is ready to execute
  */
  box.on('success', () => {
    box!.execute();
  });
  box.on('error', () => {}); // Handle any runtime/compilation errors
  box.on('output', () => {}); // Output after successful execution
};

export { writeFile, registerEvents };
