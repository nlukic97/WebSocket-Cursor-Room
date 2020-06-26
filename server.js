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
  console.log('User ' + CLIENTS.indexOf(client) + ' has logged in.')
  
  var r = Math.floor(Math.random() * Math.floor(255));
  var g = Math.floor(Math.random() * Math.floor(255));
  var b = Math.floor(Math.random() * Math.floor(255));
  client.backgroundColor = "rgb(" + r + "," + g + "," + b+ ")";
  console.log(client.backgroundColor);

  CLIENTS.forEach(client => {
    client.on('close',(index)=>{
      console.log('User ' + CLIENTS.indexOf(client) + ' has disconnected.');

      ///////////////////////////////////////////////////////   <--- kako da posaljem id, pa da taj div uklonim?
      
      // var removeId = '{"removeId":' + CLIENTS.indexOf(client) + '}'
      // console.log("Sending all clients: '"+removeId+"'")

      //   server.clients.forEach(remainingClient =>{
      //     remainingClient.send(this.removeId)
      //   })

        ///////////////////////////////////////////////////////
      }).setMaxListeners(0)

    }
  )

  client.on('message',(msg)=>{
    var newMsg = msg.slice(0,-1,0)
    newMsg = newMsg +  ', "id":' + CLIENTS.indexOf(client) + ',"backgroundColor":'+ '"' +  client.backgroundColor + '"' +'}';

    console.log('Client ' + CLIENTS.indexOf(client) + ' says: ' + msg)
    console.log('Sending Clients: ' + newMsg)
    server.clients.forEach(client =>{ //ovo salje svima
      client.send(newMsg)
    })
  })

  
})