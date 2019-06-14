import * as http from 'http';
import * as path from 'path';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as SocketIO from 'socket.io';

import env from './env';
import controller from './controller'; // Execution route controller
import regSocketEvents from './socket'; // Register function for socket server

/*
  RequestListener function
*/
const app: express.Express = express();

/*
  Default http server
*/
const server = http.createServer(app);

/*
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

/*
  Set request body parsing middlewares
*/
app.use(bodyParser.json()); // Parse JSON reqest body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL params

app.use(express.static(path.join(__dirname, 'assets'))); // Serve static content
app.use('/', controller); // Add execution route middleware
app.use('/', (_, res) => {
  return res.render('index.ejs');
});

/*
  Set default ENVs
*/
env();

/*
  Lift server, Default on PORT = 3000
*/
server.listen(process.env.NODE_PORT);

/*
  Get socket events emitter/listener
*/
const io: SocketIO.Server = SocketIO(server);
regSocketEvents(io); // Call register function with socket server as parameter
