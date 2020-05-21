const socketio = require('socket.io');
const origins = require('config').get('server:ws:origins');

module.exports.init = async (server) => {
  const options = {};
  /* Запуск ws */
  const io = socketio(server, options);
  console.log(origins);
  io.origins(origins);
  /* Коннект к ws */
  io.on('connection', (socket) => {
    console.log(`connect: ${socket.id}`);
    /* Дисконект от ws */
    socket.on('disconnect', (reason) => {
      console.log(`disconnect: ${socket.id} - ${reason}`);
    });
  });
  /* Сначала инициализируем io, потом експортируем */
  module.exports = io;
  //require('routes/ws/article');
};
