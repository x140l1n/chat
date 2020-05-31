var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const port = 3000;

const users = {};

app.use(express.static(__dirname + '/public'));

server.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

io.on("connection", (socket) =>
{
  socket.on("username", (data) =>
  {
    users[socket.id] = data.user;
    socket.broadcast.emit("user-connected", data.user);

    console.log(users);
  });

  socket.on("send-message", (data) => 
  {    
    socket.broadcast.emit("received-message", data);
  });

  //Not working
  socket.on("disconnect", () => 
  {    
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
