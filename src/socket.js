import { io } from 'socket.io-client';

const URL =
  'wss://9dc9-182-188-42-224.ngrok-free.app?stocks=%5B%22bitcoin%22%2C%22tether%22%5D0';

export const socket = io(URL, {
  path: '/api/v1/ws',
  reconnectionDelay: 10000
});
