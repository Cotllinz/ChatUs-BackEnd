const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routeNavigation = require('./src/routeNavigation')
const socket = require('socket.io')
app.use(cors())
app.use('/api2/chatus', express.static('userImage'))
app.use(express.static('userImage'))
const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/api2/socket.io'
})

/* Socket Io Settings */
io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data.room)
  })
  socket.on('changeRoom', (data) => {
    socket.leave(data.oldRoom)
    socket.join(data.room)
  })
  socket.on('leaveRoom', (data) => {
    socket.leave(data.room)
  })
  socket.on('roomMessage', (data) => {
    io.to(data.room).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typingMessage', data)
  })
})
/* ===================== */

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api2', routeNavigation)
const port = process.env.PORT
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.get('*', (req, res) => {
  res.status(404).send('Not Found Please Check again ! :)')
})
server.listen(port, () => {
  console.log(`Listening on Port ${port}`)
})
