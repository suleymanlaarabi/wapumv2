import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { useAuthStore } from "./store/AuthStore.tsx";
import { useSocketStore } from "./store/SocketStore.tsx";
useAuthStore.getState().init();
useSocketStore.getState().init();
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
