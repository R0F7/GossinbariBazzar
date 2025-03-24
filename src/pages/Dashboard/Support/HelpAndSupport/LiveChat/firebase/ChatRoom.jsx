import { useEffect, useState } from "react";
import { db } from "../../../../../../firebase/firebase.config";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import PropTypes from "prop-types";

const ChatRoom = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load Messages in Real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // Send Message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      senderID: user.uid,
      senderName: user.email,
      message,
      timestamp: serverTimestamp(),
      isAdmin: false,
    });

    setMessage("");
  };

  // console.log(messages);

  return (
    <div className="chat-container max-w-full h-[500px] flex flex-col border border-[#ccc] rounded-lg overflow-hidden bg-[#f5f5f5]">
      <div className="chat-box flex-grow overflow-y-auto p-2.5">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`${msg.isAdmin ? "admin-msg" : "user-msg flex"} mb-4`}
          >
            <div className="message">
              <strong>{msg.senderName}:</strong> {msg.message}
            </div>
          </p>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="chat-input flex p-2.5 border-t border-[#ccc]"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded-[4px] border border-[#ccc]"
        />
        <button
          type="submit"
          className="py-2 px-3 ml-2 bg-[#007bff] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#0056b3]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

ChatRoom.propTypes = {
  user: PropTypes.object,
};

export default ChatRoom;
