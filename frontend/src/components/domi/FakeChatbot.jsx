
import React, { useState } from "react";
import "./FakeChatbot.css";

const FakeChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "👋 Hi there! I'm Domi, your fashion assistant!" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { sender: "user", text: input },
            { sender: "bot", text: "✨ Nice choice! But I'm just pretending for now 😄" },
        ]);
        setInput("");
    };

    return (
        <>
            {isOpen && (
                <div className="fake-chatbot-container chatbot-slide-in">
                    <div className="fake-chatbot-header">
                        <img src="/domi.png" alt="Domi" className="domi-avatar" />
                        <div>
                            <h5>Domi</h5>
                            <small>Your friendly fashion assistant 🌸</small>
                        </div>
                        <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✖</button>
                    </div>
                    <div className="fake-chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
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
                <div className="chat-toggle-button" onClick={() => setIsOpen(true)}>
                    <img src="/domi.png" alt="Chat Toggle" />
                </div>
            )}
        </>
    );
};

export default FakeChatbot;

