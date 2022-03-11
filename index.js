const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

app.get("/", (req, res) => {
  res.send("Server Stared !!");
});

// connecting web socket to server on same port.
const wss = new WebSocket.Server({ server: server });

// trigger when connection from client
wss.on("connection", function connection(ws) {
  ws.send("Welcome to akshay chatbot 😊");

  // it will check for incoming message from client.
  ws.on("message", function message(data, isBinary) {
    console.log("received: %s", data);
    //   if(data == "hello"){
    //       ws.send('Hi..')
    //   }else{
    //       ws.send(' received this from client: ' + data);
    //   }
    // broadcast message over all network except yourself
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(3000, () => console.log(`Listening on port 3000`));
