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
  ({ language, code, testCase, timeOut} = req.body);
  let codeFile: string = '', testCaseFile: string = '';
  try {
    ([codeFile, testCaseFile] = await Promise.all([ writeFile(code), writeFile(testCase, 'T') ]));
  } catch (e) {
    if (e) {
      // Render Error [WIP]
      return;
    }
  }
  let headersSent: boolean = false;
  const cb = (err: Error) => {
    if (!err) {
      q.push(box);
      // Render success [WIP]
      return;
    }
    if (!headersSent) {
      headersSent = true;
      // Render Error [WIP]
      return;
    }
  }
  const box: BoxExec.ExecEmitter = BoxExec();
  registerEvents(box, cb);
  box.setData(language, codeFile, [{ file: testCaseFile, timeout: timeOut }]);
});

export default router;
