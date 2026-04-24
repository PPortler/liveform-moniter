import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

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

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("Socket server running on", PORT);
});