var express = require('express');
var app = express();
var ws = require('ws');
var port = 3000;

/* Creating a HTTP server to serve index.html */
app.use(express.static('./public'));
app.listen(port, ()=> console.log('Served at http://localhost:' + port))

const CLIENTS = [];
var index = 0;

/* Creating a Websocket server */
const server = new ws.Server({port: 3200});

server.on('connection', (client)=>{
  client.index = index;
  index++;

  CLIENTS.push(client)
  console.log('User ' + client.index + ' has logged in.')
  
  const r = Math.floor(Math.random() * Math.floor(255));
  const g = Math.floor(Math.random() * Math.floor(255));
  const b = Math.floor(Math.random() * Math.floor(255));

  client.backgroundColor = "rgb(" + r + "," + g + "," + b+ ")";

  client.on('close',function(){
    console.log('Client ' + this.index + ' has disconnected.');
   
    var removeId = '{"removeId":' + this.index + '}';

    server.clients.forEach(remainingClient =>{
      remainingClient.send(removeId)
    })
  }).setMaxListeners(0)


  client.on('message',function(msg){
    var newMsg = msg.slice(0,-1,0)
    newMsg = newMsg +  ', "id":' + this.index + ',"backgroundColor":'+ '"' +  client.backgroundColor + '"' +'}';

    server.clients.forEach(client =>{
      client.send(newMsg)
    })
  })

  
})