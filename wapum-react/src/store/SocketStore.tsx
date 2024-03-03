import { Socket, io } from "socket.io-client";
import { create } from "zustand";
import { BACKEND_SOCKET_URL } from "../data/dev.variable";

interface SocketStore {
  socket: Socket;
  isSocketConnected: boolean;
  init: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: {} as Socket,

  isSocketConnected: false,

  init: () => {
    const newSocket = io(BACKEND_SOCKET_URL, {
      autoConnect: true,
    });
    set({
      socket: newSocket,
    });
    newSocket.emit("connection");

    const handleConfirmation = () => {
      set({ isSocketConnected: true });
    };

    const handleDisconnect = () => {
      set({ isSocketConnected: false });
    };

    newSocket.on("confirmation", handleConfirmation);

    newSocket.on("disconnect", handleDisconnect);

    return () => {
      newSocket.off("confirmation", handleConfirmation);
      newSocket.off("disconnect", handleDisconnect);
    };
  },
}));
