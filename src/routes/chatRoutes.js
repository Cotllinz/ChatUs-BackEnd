const route = require('express').Router()
const {
  chatting,
  getChat,
  getRoomlist
} = require('../controller/chatController')

route.get('/getRoom/:id', getRoomlist)
route.post('/getChat', getChat)
route.post('/chating', chatting)
module.exports = route
