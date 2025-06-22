const express = require('express');
const app = express();
const ws = require('ws');
require('dotenv').config()

const { createMessage, generateRandomRgbColor } = require('./utils/utils');

// Defining http and ws port
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3200;


/* Creating a HTTP server to serve index.html */
app.use(express.static(require('path').join(__dirname, 'public')));
app.listen(PORT, ()=> console.log('Served at http://localhost:' + PORT))

// Auto incrementing id assigned to joining clients
let index = 0;

const TYPE = {
  NEW_MOVEMENT:"NEW_MOVEMENT", // event client sends to server when they move their cursor
  UPDATE_COORDS:"UPDATE_COORDS", // event server sends other clients to adjust specific cursor position
  REMOVE_CIRCLE:"REMOVE_CIRCLE" // event server sends to remaining clients if a client leaves
}


/**
* @spec
* handleClientMessage(payload)
* 
* - Handles incoming messages from a connected WebSocket client.
* - @param {string} payload - The JSON string sent by the client, containing the message type and data.
* - @param {WebSocket} client - The WebSocket client instance that sent the message.
* - Parses the payload and determines the message type.
* - If the message type is TYPE.NEW_MOVEMENT:
*   - Constructs a new message of type TYPE.UPDATE_COORDS, including the sender's id and cursor color.
*   - Broadcasts the new message to all connected clients to update cursor positions.
* - Ignores other message types.
*/
function handleClientMessage(payload, client){
  const msg = JSON.parse(payload)
  
  if (msg.type === TYPE.NEW_MOVEMENT) {
    const newPayload = createMessage(TYPE.UPDATE_COORDS,
      {
        ...msg.data, 
        id: client.index, 
        cursorColor: client.cursorColor
      }
    );
    
    server.clients.forEach(client => {
      client.send(newPayload);
    });
  }
}


/**
* @spec
* handleClientExit()
* 
* - Handles the disconnection of a client.
* - Logs the disconnection event with the client's index.
* - Notifies all connected clients to remove the circle associated with the disconnected client by sending a REMOVE_CIRCLE message.
*/
function handleClientExit(){
  console.log('Client ' + this.index + ' has disconnected.');
  
  server.clients.forEach(client =>{
    client.send(
      createMessage(TYPE.REMOVE_CIRCLE,{id: this.index})
    )
  })
}


// Create a new WebSocket server instance listening on the specified port
const server = new ws.Server({port: WS_PORT || 3200});

server.on('listening',()=> console.log('Websocket server is listening on port ' + WS_PORT))

server.on('connection', (client)=>{
  // determining user's cursor color, and uniqueid
  client.cursorColor = generateRandomRgbColor()
  client.index = index;
  console.log('User ' + client.index + ' has entered the room.')
  index++;
  
  // clien event listeners
  client.on('message', (payload) => handleClientMessage(payload, client))
  client.on('close', handleClientExit);
})

// Express server to serve API route for frontend to check ports


// API route to get port info
app.get('/api/ports', (_, res) => res.json({ PORT, WS_PORT }));

