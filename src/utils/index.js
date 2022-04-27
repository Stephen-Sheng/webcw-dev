
import openSocket from 'socket.io-client'

function subscribeUncompletedOrderLst(orderID, cb) {
  const socket = openSocket('http://localhost:12312');
  socket.on('orderLst', orderLst => cb(null, orderLst));
  socket.emit('resOrder', orderID);
  
}

function subscribeUserOrderLst(username, cb) {
  const socket = openSocket('http://localhost:12312');
  socket.on('cusOrderLst', userOrderLst => cb(null, userOrderLst));
  socket.emit('orderList', username);
  
}

function subscribeUserOrderItem(orderID, cb) {
  const socket = openSocket('http://localhost:12312');
  socket.on('SendItemInfo', userOrderLst => cb(null, userOrderLst));
  socket.emit('SendItemOrderID', orderID);
  
}
export { subscribeUncompletedOrderLst, subscribeUserOrderLst, subscribeUserOrderItem };