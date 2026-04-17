// import { io } from 'socket.io-client';
//
// const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'https://chatapp-main-production.up.railway.app';{
//   autoConnect: false,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });
//
// export default socket;

import { io } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://chatapp-main-production.up.railway.app';

const socket = io(BACKEND_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;