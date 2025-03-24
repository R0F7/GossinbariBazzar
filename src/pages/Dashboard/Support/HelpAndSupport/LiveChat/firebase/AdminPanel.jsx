import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase.config";

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // Admin Reply Send
  const sendReply = async (e) => {
    e.preventDefault();
    if (reply.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      senderID: "admin",
      senderName: "Admin",
      message: reply,
      timestamp: serverTimestamp(),
      isAdmin: true,
    });

    setReply("");
  };

  return (
    <div className="chat-container max-w-full h-[500px] flex flex-col border border-[#ccc] rounded-lg overflow-hidden bg-[#f5f5f5]">
      <div className="chat-box flex-grow overflow-y-auto p-2.5">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`${
              msg?.isAdmin ? "text-right user-msg" : "admin-msg"
            } mb-4`}
          >
            <div className="message">
              <strong>{msg.senderName}:</strong> {msg.message}
            </div>
          </p>
          // console.log(msg.isAdmin)
        ))}
      </div>
      <form
        onSubmit={sendReply}
        className="chat-input flex p-2.5 border-t border-[#ccc]"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
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

export default AdminPanel;
