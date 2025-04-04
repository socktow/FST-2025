let socket;
let onMessageCallback = null;

export function connectWebSocket(callback) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return;
  }

  socket = new WebSocket("ws://localhost:58869/ws/in");

  socket.onopen = () => console.log("✅ Connected to WebSocket");

  socket.onmessage = (event) => {
    const data = event.data.trim();
    if (data === "KeepAlive") {
      console.log("🔄 Received KeepAlive, ignoring...");
      return;
    }

    try {
      if (data.startsWith("{") || data.startsWith("[")) {
        const jsonData = JSON.parse(data);
        if (onMessageCallback) {
          onMessageCallback(jsonData);
        }
      } else {
        console.warn("⚠️ Received non-JSON message:", data);
      }
    } catch (error) {
      console.error("❌ Error parsing WebSocket message:", error);
    }
  };

  socket.onerror = (error) => console.error("❌ WebSocket error:", error);
  socket.onclose = () => console.log("🔴 WebSocket disconnected");

  onMessageCallback = callback;
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
  }
}
