const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const messageRoutes = require('./src/routes/message.routes');
const socketHandler = require('./src/socket/socket.handler');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001' ,'http://192.168.1.77:3000'],
    methods: ['GET', 'POST'],
  },
});

// ── Middlewares ──
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001', 'http://192.168.1.77:3000']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ── DB Connect ──
connectDB();

// ── Routes ──
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// ── Socket ──
socketHandler(io);

// ── Start ──
server.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});