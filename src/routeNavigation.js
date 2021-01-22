const route = require('express').Router()
const user = require('./routes/userRoutes')
const friend = require('./routes/addFriendRoutes')
const chat = require('./routes/chatRoutes')
route.use('/user', user)
route.use('/friend', friend)
route.use('/chat', chat)
module.exports = route
