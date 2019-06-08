import * as express from 'express';
import * as bodyParser from 'body-parser';

import env from './env';
import controller from './controller'; // Execution route controller

const app: express.Express = express();

/*
  Set request body parsing middlewares
*/
app.use(bodyParser.json()); // Parse JSON reqest body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL params

app.use('/', controller); // Add execution route middleware

/*
  Set default ENVs
*/
env();

/*
  Lift server, Default on PORT = 3000
*/
app.listen(process.env.NODE_PORT);
