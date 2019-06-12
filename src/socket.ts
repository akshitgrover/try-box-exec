import * as SocketIO from 'socket.io';

export default function registerSocketEvents(io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    /*
      Emit socketID back to the client
      socketID will be added in the http request to get stage/output info in realtime
    */
    socket.emit('join', { id: socket.id });
  })
};
