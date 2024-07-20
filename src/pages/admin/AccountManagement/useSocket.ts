import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Tạo Socket kết nối
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      console.log('Socket Connected');
    });

    socketRef.current.on('message', (message) => {
      console.log('Received message:', message);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket Disconnected');
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket Error:', error);
    });

    // Đóng Socket khi component unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  return socketRef.current;
};

export default useSocket;
