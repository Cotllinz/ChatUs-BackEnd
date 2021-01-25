const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const routeNavigation = require('./src/routeNavigation')
const socket = require('socket.io')
app.use(cors())
app.use(express.static('userImage'))
/* app.use(express.static('productImage')) */
const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  }
})

/* Socket Io Settings */
io.on('connection', (socket) => {
  console.log('Socket.io Connect')
  // global Message = pesan yang dikirmkkan ke semua client
  // private Message =  pesan yang hannya dikirimkan ke client saja
  // broadcast Message = pesan yang di kirimkan ke semua client kecuali si pengirim
  // room = ruangan pesan yag bisa diakses/ dimasuki client
  socket.on('globalMessage', (data) => {
    console.log(data)
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    socket.join(data.room)
  })
  socket.on('changeRoom', (data) => {
    socket.leave(data.oldRoom)
    socket.join(data.room)
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
app.use('/', routeNavigation)
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
