const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// تجهيز تطبيق Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // دمج محرك Socket.io (الرؤية الشاملة للمزامنة الحية)
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on('connection', (socket) => {
    console.log(`🟢 مستخدم متصل بالاستوديو الحي: ${socket.id}`);

    // مزامنة تشغيل الفيديو (Sync Player)
    socket.on('player:play', (time) => socket.broadcast.emit('player:sync_play', time));
    socket.on('player:pause', (time) => socket.broadcast.emit('player:sync_pause', time));
    socket.on('player:seek', (time) => socket.broadcast.emit('player:sync_seek', time));

    // مزامنة مؤشرات الماوس (Live Cursors)
    socket.on('cursor:move', (data) => socket.broadcast.emit('cursor:update', data));

    // التعليقات الزمنية الحية
    socket.on('comment:new', (comment) => io.emit('comment:broadcast', comment));

    socket.on('disconnect', () => {
      console.log(`🔴 مستخدم غادر: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`\x1b[32m[SERVER READY]\x1b[0m 🚀 monteerly Studio platform Socket.io Engine running on http://${hostname}:${port}`);
  });
});
