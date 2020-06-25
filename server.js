var express = require('express');
var app = express();
var ws = require('ws');
var port = 3000;

app.listen(port, ()=>{
  console.log('Served on port: ' + port);
})
app.use(express.static('./public'));

var server = new ws.Server({port: 3200});

server.on('connection', (client)=>{
  console.log('A user has connected.');
  console.log(server.clients.size)
  
  client.on('close',()=>{
    console.log('A user has disconnected.');
    console.log(server.clients.size)
  })

  client.on('message',(msg)=>{  
    // console.log('Client says ' + msg);
    // console.log('Sending client: ' + msg)
    // client.send(msg);
    server.clients.forEach((client)=>{
      client.send(msg)
    })
  })
})