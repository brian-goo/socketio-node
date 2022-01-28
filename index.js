const express = require("express")
const { Server } = require("socket.io")
const { createServer } = require("http")
const path = require("path")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })
const PORT = 5000

app.use(express.static(path.join(__dirname, 'static')));

io.on("connection", socket => {
  console.log(socket.id, "joined")

  // const room = "room1"
  // console.log(socket.id, "joins", room)
  // socket.join(room)
  // socket.to(room).emit("enter", `${socket.id} joins ${room}`)

  socket.on("join", room => {
    console.log(socket.id, "joins", room)
    socket.join(room)
    socket.to(room).emit("enter", `${socket.id} joins ${room}`)
  })
})


httpServer.listen(PORT, () => console.log(`server started... http://localhost:${PORT}`))