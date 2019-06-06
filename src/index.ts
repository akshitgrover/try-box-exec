import * as express from 'express';

import env from './env';

const app: express.Express = express();

/*
  Set default ENVs
*/
env();

/*
  Lift server, Default on PORT = 3000
*/
app.listen(process.env.NODE_PORT);
