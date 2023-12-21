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

const chatHistory = [];
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  console.log(`access_token`, socket.handshake.auth.access_token)
  console.log(`username`, socket.handshake.auth.username);
  socket.emit("hello", "masuk ga bang");


  socket.emit("message:history", chatHistory);

  socket.on("message:new", (message) => {
    const newMessage = {
      from: socket.handshake.auth.username,
      message
    };
    chatHistory.push(newMessage);

    io.emit("message:update", newMessage);
  });
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require(`./routes`))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})