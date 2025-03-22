// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";

// // Backend URL (use .env variable or hardcode)
// const socket = io(import.meta.env.VITE_API_URL);

// // eslint-disable-next-line react/prop-types
// const ChatComponent = ({ email, userType }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     if (!email) return;

//     // Join the user to the chat room
//     socket.emit("joinChat", email);

//     // Load previous messages when the chat starts
//     socket.emit("loadMessages", email);

//     // Listen for incoming messages
//     socket.on("previousMessages", (history) => {
//       setMessages(history);
//     });

//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     // Auto scroll to the bottom when a new message arrives
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("previousMessages");
//     };
//   }, [email]);

//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       const newMessage = { email, userType, text: message };
//       socket.emit("sendMessage", newMessage);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-container max-w-full h-[500px] flex flex-col border border-[#ccc] rounded-lg overflow-hidden bg-[#f5f5f5]">
//       <div className="chat-box flex-grow overflow-y-auto p-2.5">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`${msg.userType === "Admin" ? "admin-msg" : "user-msg flex"} mb-4`}>
//             <div className="message">
//               <strong>{msg.userType}:</strong> {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={messageEndRef}></div>
//       </div>

//       <div className="chat-input flex p-2.5 border-t border-[#ccc]">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 rounded-[4px] border border-[#ccc]"
//         />
//         <button onClick={sendMessage} className="py-2 px-3 ml-2 bg-[#007bff] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#0056b3]">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;


import { useState, useEffect } from "react";
// import { db, auth } from "./firebaseConfig";
import { collection, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../../firebase/firebase.config";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);
      
      if (chatSnap.exists()) {
        const chatData = chatSnap.data();
        const updatedMessages = [...chatData.messages, {
          senderId: auth.currentUser.uid,
          message: newMessage,
          timestamp: new Date(),
        }];

        await updateDoc(chatRef, { messages: updatedMessages });
        setNewMessage("");
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.senderId === auth.currentUser.uid ? "sent" : "received"}`}>
            {msg.message}
          </p>
        ))}
      </div>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
