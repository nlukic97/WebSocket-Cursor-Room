var express = require('express');
var app = express();
var ws = require('ws');
var port = 3000;

app.listen(port, ()=>{
  console.log('Served on port: ' + port);
})
app.use(express.static('./public'));

var server = new ws.Server({port: 3200});
var CLIENTS = [];
server.on('connection', (client, req)=>{
  CLIENTS.push(client)  
  console.log('User ' + CLIENTS.indexOf(client) + ' has logged in.') //after 11 we 
  
  CLIENTS.forEach(client => {
    client.on('close',(index)=>{
      // console.log('A user has disconnected.');
      console.log('User ' + CLIENTS.indexOf(client) + ' has disconnected.');
      }).setMaxListeners(0)  
    }
  )

  client.on('message',(msg)=>{
    var newMsg = msg.slice(0,-1,0)
    newMsg = newMsg +  ', "id":' + CLIENTS.indexOf(client) +'}';

    console.log('Client ' + CLIENTS.indexOf(client) + ' says: ' + msg)
    console.log('Sending Clients: ' + newMsg)
    // client.send(newMsg); //ovo ce samo poslati jednom
    server.clients.forEach(client =>{ //ovo salje svima
      client.send(newMsg)
    })
  })

  
})