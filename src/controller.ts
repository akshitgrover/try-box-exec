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
      res.status(422).send("Error: Unable to process code/testcase file");
      return;
    }
  }
  let headersSent: boolean = false;
  const cb = (err: Error) => {
    if (!err) {
      q.push(box!);
      res.status(200).send();
      return;
    }
    if (!headersSent) {
      headersSent = true;
      box = null;
      res.status(422).send(`Error: ${err.message}`);
      return;
    }
  }
  let box: BoxExec.ExecEmitter | null = BoxExec();
  registerEvents(box, socketID, cb);
  box.setData(language, codeFile, [{ file: testCaseFile, timeout: timeOut }]);
});

export default router;
