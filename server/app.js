if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require(`cors`)

const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});



io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  console.log(`access_token`, socket.handshake.auth.access_token)
  console.log(`username`, socket.handshake.auth.username)
  socket.emit("hello", "masuk ga bang");

  socket.on("message:new", (message) => {
    io.emit("message:update", {
      from: socket.handshake.auth.username,
      message
    })
  })
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require(`./routes`))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})