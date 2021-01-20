const route = require('express').Router()
const user = require('./routes/userRoutes')

route.use('/user', user)
module.exports = route
