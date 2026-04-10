type Listener = (data: any) => void;

class MockSocketService {
  private listeners: Record<string, Listener[]> = {};
  private intervals: NodeJS.Timeout[] = [];

  // الاشتراك في حدث
  on(event: string, callback: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  // إطلاق حدث (داخلي)
  private emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  // بدء المحاكاة (Simulate Live Environment)
  startSimulation() {
    console.log("🟢 Starting Live Simulation...");

    // 1. محاكاة حركة ماوس لمستخدم آخر كل 100ms
    const mouseInterval = setInterval(() => {
      this.emit('cursor_move', {
        userId: 'user-2',
        x: Math.random() * 80 + 10, // % width
        y: Math.random() * 80 + 10, // % height
        userName: 'Sarah (Client)',
        color: '#ec4899'
      });
    }, 2000); // Slow movement for demo

    // 2. محاكاة إشعار جديد كل 30 ثانية
    const notifInterval = setInterval(() => {
      this.emit('notification', {
        id: Date.now(),
        text: 'قام خالد برفع نسخة جديدة v4',
        type: 'info'
      });
    }, 30000);

    this.intervals.push(mouseInterval, notifInterval);
  }

  stopSimulation() {
    this.intervals.forEach(clearInterval);
  }
}

export const socketService = new MockSocketService();
