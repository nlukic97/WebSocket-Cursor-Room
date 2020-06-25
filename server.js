var express = require('express');
var app = express();
var ws = require('ws');
var port = 3000;

app.listen(port, ()=>{
  console.log('Served on port: ' + port);
})
app.use(express.static('./public'));

var server = new ws.Server({port: 3200});

server.on('connection', (client, req)=>{
  //CLIENTS[0].close() //opet problem nastaje jer na refresh se smatra da je drugi korisnik
  console.log('A user has connected.');
  const ip = req.socket.remoteAddress; //mozda ovo ???
  console.log(ip)
  // console.log('Users on server: ' + server.clients.size);
  
  client.on('close',()=>{
    console.log('A user has disconnected.');
  })

  client.on('message',(msg)=>{ 
    // console.log('Client says ' + msg);
    // console.log('Sending client: ' + msg)
    client.send(msg);
    server.clients.forEach( client =>{
      client.send(msg)
    })
  })

  
})