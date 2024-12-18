const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);
  
  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients except the sender
    for (const client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});

console.log('WebSocket server is running on ws://localhost:3001');
