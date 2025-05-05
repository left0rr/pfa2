// import React, { useEffect, useRef, useState } from "react";
// import "./Domi.css";
// import { useRasaSocket } from "../../hooks/useRasaSocket.jsx";
//
// const FakeChatbot2 = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [input, setInput] = useState("");
//     const [avatarAnim, setAvatarAnim] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const messagesEndRef = useRef(null);
//     const animationOptions = [
//         "float",       // subtle up-down motion
//         "pulse",       // slow scale up/down
//         "wave",        // rotation like a wave
//         "neon",        // glowing border
//         "bounce",      // vertical bounce
//         "wiggle",      // left-right shake
//         "spin",        // continuous spin
//         "flip",        // Y-axis flip
//         "zoom-in",     // pop-in zoom
//         "hover-glow",  // soft glowing hover effect
//         "spring", "summer", "spooky", "frosty", "neon-night", "zigzag",
//     ];
//
//
//     const { messages, sendMessage } = useRasaSocket();
//
//     useEffect(() => {
//         const random = animationOptions[Math.floor(Math.random() * animationOptions.length)];
//         setAvatarAnim(random);
//     }, []);
//
//     const handleSend = () => {
//         if (!input.trim()) return;
//         sendMessage(input);
//         setInput("");
//         setIsTyping(true);
//     };
//
//     useEffect(() => {
//         const scrollToBottom = () => {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         };
//
//         scrollToBottom();
//
//         if (messages.length > 0) {
//             const audio = new Audio("msg-pop.mp3"); // Place a short sound in your public folder
//             audio.play().catch(() => {});
//         }
//
//         if (messages[messages.length - 1]?.from === "bot") {
//             setIsTyping(false);
//         }
//     }, [messages]);
//
//     return (
//         <>
//             {isOpen && (
//                 <div className="fake-chatbot-container chatbot-slide-in">
//                     <div className="fake-chatbot-header">
//
//                         <img
//                             src="/domi.png"
//                             alt="Domi"
//                             className={`domi-avatar ${avatarAnim}`}
//                             onClick={() => {
//                                 const currentIndex = animationOptions.indexOf(avatarAnim);
//                                 const nextIndex = (currentIndex + 1) % animationOptions.length;
//                                 setAvatarAnim(animationOptions[nextIndex]);
//                             }}
//                             style={{ cursor: "pointer" }}
//                         />
//
//                         <div>
//                             <h5>Domi</h5>
//                             <small>Your friendly fashion assistant 🌸</small>
//                         </div>
//                         <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✖</button>
//                     </div>
//                     <div className="fake-chatbot-messages">
//                         {messages.map((msg, i) => (
//                             <div key={i} className={`message ${msg.from}`}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                         {isTyping && (
//                             <div className="message bot typing">Domi is typing...</div>
//                         )}
//                         <div ref={messagesEndRef}></div>
//                     </div>
//                     <div className="fake-chatbot-input">
//                         <input
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Type something stylish..."
//                             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                         />
//                         <button onClick={handleSend}>Send</button>
//                     </div>
//                 </div>
//             )}
//
//             {!isOpen && (
//                 <div className="chat-toggle-button" onClick={() => setIsOpen(true)}>
//                     <img src="/domi.png" alt="Chat Toggle" />
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default FakeChatbot2;
