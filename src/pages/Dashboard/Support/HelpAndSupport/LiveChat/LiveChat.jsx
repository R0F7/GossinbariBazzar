import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// Backend URL (use .env variable or hardcode)
const socket = io(import.meta.env.VITE_API_URL);

// eslint-disable-next-line react/prop-types
const LiveChat = ({ email, userType }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!email) return;

    // Join the user to the chat room
    socket.emit("joinChat", email);

    // Load previous messages when the chat starts
    socket.emit("loadMessages", email);

    // Listen for incoming messages
    socket.on("previousMessages", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Auto scroll to the bottom when a new message arrives
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      socket.off("receiveMessage");
      socket.off("previousMessages");
    };
  }, [email]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { email, userType, text: message };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  // console.log(messages);

  // const x = messages.filter(m => m.userType !== "Admin")
  // const y = messages.filter(m => m.userType !== "Vendor")


  return (
    <div className="chat-container max-w-full h-[500px] flex flex-col border border-[#ccc] rounded-lg overflow-hidden g-[#f5f5f5]">
      <div className="chat-box flex-grow overflow-y-auto p-2.5">
        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.userType === "Admin" ? "admin-msg" : "user-msg flex"} mb-4`}>
            <div className="message">
              <strong>{msg.userType}:</strong> {msg.text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <div className="chat-input flex p-2.5 border-t border-[#ccc]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-[4px] border border-[#ccc]"
        />
        <button onClick={sendMessage} className="py-2 px-3 ml-2 bg-[#007bff] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#0056b3]">Send</button>
      </div>
    </div>
  );
};

export default LiveChat;
