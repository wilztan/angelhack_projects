var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/***
* Static Public
*/
app.use("/public", express.static(__dirname + "/public"));

app.get('/',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/index.html');
})

app.get('/button',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/button.html');
})


app.get('/sign',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/sign.html');
})


app.get('/toilet',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/toilet.html');
})

app.get('/dashboard',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/dashboard.html');
})

app.get('/bar',function (req,res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/bar.html');
})

// CHECK USER LOGIN
io.on('connection',function(socket){
  console.log('A Peers Connected');
  socket.on('disconnect',function(){
    console.log('user disconnected');
  });
});

io.on('connection',function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
io.on('connection',function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// ,'10.0.9.96'

http.listen(3000,'192.168.43.113',function(){
  console.log('Listening on 3000');
})
