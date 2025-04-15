import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5005"; // change this if needed

export const useRasaSocket = () => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL, {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("🔌 Connected to Rasa");
        });

        socketRef.current.on("bot_uttered", (msg) => {
            setMessages((prev) => [...prev, { from: "bot", text: msg.text }]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const sendMessage = (message) => {
        const msg = {
            message,
            sender: "user",
        };

        socketRef.current.emit("user_uttered", msg);
        setMessages((prev) => [...prev, { from: "user", text: message }]);
    };

    return { messages, sendMessage };
};
