var express = require('express');
var app = express();
var ws = require('ws');
var port = 3000;

/* Creating a HTTP server to serve index.html */
app.use(express.static('./public'));
app.listen(port, ()=> console.log('Served at http://localhost:' + port))

const CLIENTS = [];
var index = 0;

const TYPE = {
  NEW_MOVEMENT:"NEW_MOVEMENT",
  UPDATE_COORDS:"UPDATE_COORDS",
  REMOVE_CIRCLE:"REMOVE_CIRCLE"
}

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
    CLIENTS.splice(client.index, 1)

    const payload = createMessage(TYPE.REMOVE_CIRCLE,{id: client.index})

    server.clients.forEach(remainingClient =>{
      remainingClient.send(payload)
    })
  }).setMaxListeners(0) // TODO confirm why I disabled memory leak feature with this


  client.on('message',function(payload){
   const msg = JSON.parse(payload)

    switch(msg.type){
      case TYPE.NEW_MOVEMENT:

        const newPayload = createMessage(TYPE.UPDATE_COORDS,
          {
            ...msg.data, 
            id: client.index, 
            backgroundColor: client.backgroundColor
          }
        )        

        server.clients.forEach(client=>{
          client.send(newPayload)
        })
        break;
    }
    
  })

})

function createMessage(type,data){
  return JSON.stringify({type,data})
}