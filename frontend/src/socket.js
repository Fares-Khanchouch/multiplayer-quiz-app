// frontend/src/socket.js
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log('Socket connecting to:', BACKEND_URL);
console.log('Environment variables:', {
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL
});

const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});

// Add comprehensive socket event logging
socket.on('connect', () => {
  console.log('🟢 SOCKET CONNECTED to:', BACKEND_URL);
  console.log('Socket ID:', socket.id);
});

socket.on('connect_error', (error) => {
  console.log('🔴 SOCKET CONNECTION ERROR:', error);
});

socket.on('disconnect', (reason) => {
  console.log('🔴 SOCKET DISCONNECTED:', reason);
});

socket.on('error', (error) => {
  console.log('🔴 SOCKET ERROR:', error);
});

export default socket;