import { WebSocket } from "ws";
import * as http from "http";

const PORT = 4001;

const server = http.createServer();

const ws = new WebSocket.Server({ server });

ws.on("connection", (ws: WebSocket) => {
  ws.on("message", (data: any) => {
    console.log("data", data.toString());
  });

  ws.send(JSON.stringify({ message: "Connection established successfully" }));
});

ws.on("close", () => {
  console.log("connection close");
});

server.listen(PORT, () => {
  console.log("Server is running...");
});
