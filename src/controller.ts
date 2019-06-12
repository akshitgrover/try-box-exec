import * as BoxExec from 'box-exec';

import { Router, Request, Response } from 'express';

import { writeFile, registerEvents } from './utils';
import q from './queue';

const router: Router = Router();

router.post('/execute', async (req: Request, res: Response): Promise<void> => {
  let language: number;
  let code: string;
  let testCase: string;
  let timeOut: number;
  let socketID: string;
  ({ language, code, testCase, timeOut, socketID} = req.body);
  let codeFile: string = '', testCaseFile: string = '';
  let uid: string = Math.random().toString(16).slice(2);
  try {
    ([codeFile, testCaseFile] = await Promise.all([ writeFile(code, uid), writeFile(testCase, uid, 'T') ]));
  } catch (e) {
    if (e) {
      // Render Error [WIP]
      return;
    }
  }
  let headersSent: boolean = false;
  const cb = (err: Error) => {
    if (!err) {
      q.push(box!);
      // Render success [WIP]
      return;
    }
    if (!headersSent) {
      headersSent = true;
      box = null;
      // Render Error [WIP]
      return;
    }
  }
  let box: BoxExec.ExecEmitter | null = BoxExec();
  registerEvents(box, cb);
  box.setData(language, codeFile, [{ file: testCaseFile, timeout: timeOut }]);
});

export default router;
