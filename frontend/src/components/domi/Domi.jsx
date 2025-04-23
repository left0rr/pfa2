import React, { useEffect, useRef, useState } from "react";
import "./Domi.css";
import { sendToRasa } from "../../api/rasaApi.js"; // NEW: REST API call

const Domi = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [avatarAnim, setAvatarAnim] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const animationOptions = [
        "float", "pulse", "wave", "neon", "bounce", "wiggle",
        "spin", "flip", "zoom-in", "hover-glow",
        "spring", "summer", "spooky", "frosty", "neon-night", "zigzag",
    ];

    useEffect(() => {
        const random = animationOptions[Math.floor(Math.random() * animationOptions.length)];
        setAvatarAnim(random);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = { from: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Send to Rasa REST API
        const responses = await sendToRasa(input, "domi-user");

        const botMessages = responses.map(res => ({
            from: "bot",
            text: res.text || "[no response]",
        }));

        setMessages(prev => [...prev, ...botMessages]);
        setIsTyping(false);
    };

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        scrollToBottom();

        if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.from === "bot") {
                const audio = new Audio("/msg-pop.mp3"); // Make sure file exists
                audio.play().catch(() => {});
            }
        }
    }, [messages]);

    return (
        <>
            {isOpen && (
                <div className="fake-chatbot-container chatbot-slide-in">
                    <div className="fake-chatbot-header">
                        <img
                            src="/domi.png"
                            alt="Domi"
                            className={`domi-avatar ${avatarAnim}`}
                            onClick={() => {
                                const currentIndex = animationOptions.indexOf(avatarAnim);
                                const nextIndex = (currentIndex + 1) % animationOptions.length;
                                setAvatarAnim(animationOptions[nextIndex]);
                            }}
                            style={{ cursor: "pointer" }}
                        />
                        <div>
                            <h5>Domi</h5>
                            <small>Your friendly fashion assistant 🌸</small>
                        </div>
                        <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    <div className="fake-chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.from}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing">Domi is typing...</div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="fake-chatbot-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type something stylish..."
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}

            {!isOpen && (
                <div className="chat-toggle-button" onClick={() => {
                    setIsOpen(true);
                    if (messages.length === 0) {
                        setMessages([{ from: "bot", text: "👋 Hi there! I'm Domi, your fashion assistant!" }]);
                    }
                }}>
                    <img src="/domi.png" alt="Chat Toggle" />
                </div>
            )}

        </>
    );
};

export default Domi;
