const route = require('express').Router()
const {
  chatting,
  getChat,
  getRoomlist,
  createRoom
} = require('../controller/chatController')

route.get('/getRoom/:id', getRoomlist)
route.post('/getChat', getChat)
route.post('/chating', chatting)
route.post('/createRoom', createRoom)
module.exports = route
