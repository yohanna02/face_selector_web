const http = require("http");
const express = require("express");
const ws = require("ws");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});

const wss = new ws.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});
