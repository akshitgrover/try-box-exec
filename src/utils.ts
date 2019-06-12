import * as fs from 'fs';
import * as path from 'path';

import { ExecEmitter } from 'box-exec';
import q from './queue';

const writeFile = (content: string, uid: string, type: 'T' | 'C' = 'C'): Promise<string> => {
  return new Promise((resolve, reject) => {
    let name = uid + '-' + (type == 'T')? 'testcase' : 'code';
    const filePath: string = path.join(__dirname, `../uploads/${name}`);
    const cb = (err) => {
      if (err) {
        reject(err);
      }
      resolve(filePath);
    }
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
  box.on('success', cb);
  /*
    Emits current stage of queued process
  */
  box.on('stage', (val) => { });
  /*
    Handle any runtime/compilation errors
  */
  box.on('error', () => {
    box = null;
    q.next();
  });
  /*
    Output after successful execution
  */
  box.on('output', () => {
    box = null;
    q.next();
  });
};

export { writeFile, registerEvents };
