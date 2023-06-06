import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle private chat rooms
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle chat messages
  socket.on('message', (room, message) => {
    console.log(`Received message in room ${room}: ${message}`);
    io.to(room).emit('message', message); // Broadcast the message to the room
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3030; // You can change this port if needed
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});