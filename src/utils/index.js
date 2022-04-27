
import openSocket from 'socket.io-client'

function subscribeToTimer(orderID, cb) {
  const socket = openSocket('http://localhost:12312');
  socket.on('orderLst', orderLst => cb(null, orderLst));
  socket.emit('resOrder', orderID);
  
}
export { subscribeToTimer };