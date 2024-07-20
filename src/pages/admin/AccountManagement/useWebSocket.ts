import { useEffect, useRef } from 'react';

const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Tạo WebSocket kết nối
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    socketRef.current.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Đóng WebSocket khi component unmount
    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  return socketRef.current;
};

export default useWebSocket;
