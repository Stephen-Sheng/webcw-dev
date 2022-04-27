
function subscribeToTimer(socket, interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', interval);
}
export { subscribeToTimer };