import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("form:update", (data) => {
    socket.broadcast.emit("form:update", data);
  });

  socket.on("form:submit", (data) => {
    socket.broadcast.emit("form:submit", data);
  });

  socket.on("form:status", (status) => {
    socket.broadcast.emit("form:status", status);
  });

});