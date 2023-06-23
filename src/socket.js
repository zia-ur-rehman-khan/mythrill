import { io } from 'socket.io-client';

const URL =
  'wss://app-dev.mythril.ai?stocks=%5B%22cardano%22%2C%22kusama%22%5D';

export const socket = io(URL);
