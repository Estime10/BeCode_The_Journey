// eventHandlers.js
const createHandlers = (io) => {
    const handlers = {};
  
    handlers.connection = (socket) => {
      console.log(' user is connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    };
  
    handlers.chat = (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    };
  
    return handlers;
  };
  
  export default createHandlers;
  