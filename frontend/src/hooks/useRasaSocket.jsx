import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5005"; // Your Rasa server

export const useRasaSocket = () => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isSessionReady, setIsSessionReady] = useState(false); // ✅ New state
    const sessionIdRef = useRef(
        localStorage.getItem("rasa_session_id") || `user_${Math.floor(Math.random() * 1000000)}`
    );

    // 🧠 Save session ID in localStorage for persistent sessions
    useEffect(() => {
        localStorage.setItem("rasa_session_id", sessionIdRef.current);
    }, []);

    // Set up the socket connection and event listeners
    useEffect(() => {
        socketRef.current = io(SOCKET_URL, {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("🔌 Connected to Rasa");

            // ✅ Request session with consistent session_id
            socketRef.current.emit("session_request", {
                session_id: sessionIdRef.current,
            });
            console.log("📨 session_request sent with ID:", sessionIdRef.current);
        });

        // ✅ Wait for confirmation before sending messages
        socketRef.current.on("session_confirm", (session) => {
            console.log("✅ Session confirmed:", session);
            setIsSessionReady(true); // 🔥 Mark session as ready
        });

        socketRef.current.on("bot_uttered", (msg) => {
            console.log("🤖 Bot full payload:", msg);

            let messageText = msg.text || msg.message || msg.data?.text || "⚠️ No message found";

            setMessages((prev) => [...prev, { from: "bot", text: messageText }]);
        });



        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Send message to Rasa
    const sendMessage = (message) => {
        if (!message.trim()) return;
        if (!isSessionReady) {
            console.warn("⚠️ Session not ready, message skipped:", message);
            return;
        }

        const payload = {
            sender: sessionIdRef.current, // 🔑 Match session_id
            message,
        };

        socketRef.current?.emit("user_uttered", payload);
        setMessages((prev) => [...prev, { from: "user", text: message }]);
    };

    return { messages, sendMessage };
};
