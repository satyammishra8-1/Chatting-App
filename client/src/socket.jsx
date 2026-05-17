import { io } from "socket.io-client";

const socket = io("https://chatting-app-uc1r.onrender.com");

export default socket;