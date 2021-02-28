const route = require('express').Router()
const {
  chatting,
  getChat,
  getRoomlist,
  createRoom,
  readingChat
} = require('../controller/chatController')

route.get('/getRoom/:id', getRoomlist)
route.post('/getChat', getChat)
route.post('/chating', chatting)
route.post('/read', readingChat)
route.post('/createRoom', createRoom)
module.exports = route
