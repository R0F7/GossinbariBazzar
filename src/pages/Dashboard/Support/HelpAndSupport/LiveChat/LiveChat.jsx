import useGetSecureData from "@/hooks/useGetSecureData";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import NoMessage from "../../../../../assets/no-message-error.jpg";
import { Input } from "@/components/ui/input";
import { IoMdSend } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";

const socket = io(import.meta.env.VITE_API_URL);

const LiveChat = ({ sendMail }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toEmail, setToEmail] = useState(null);
  const messageEndRef = useRef(null);
  const {
    user: { email },
  } = useAuth();
  const { data: admins, isLoading } = useGetSecureData(
    "admins",
    `/users?role=admin`
  );

  useEffect(() => {
    if (!admins || isLoading) return;

    if (sendMail) {
      setToEmail(sendMail);
    } else {
      setToEmail(admins[0].email);
    }
  }, [admins, isLoading, sendMail]);

  useEffect(() => {
    if (!email) return;

    // Join the user to the chat room
    socket.emit("joinChat", email);

    // Load previous messages when the chat starts
    socket.emit("loadMessages", { email, toEmail });

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
  }, [email, toEmail]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.text.value;

    if (message.trim() !== "") {
      const newMessage = {
        email,
        toEmail,
        text: message,
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="chat-container max-w-full h-[500px] flex flex-col border border-[#ccc] rounded-lg overflow-hidden g-[#f5f5f5] p-4">
      {/* chat */}
      <div className="h-full overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${
                msg.email !== email ? "opposite-msg" : "my-msg flex"
              } mb-4`}
            >
              <p
                data-tooltip-id={msg._id}
                data-tooltip-content={new Date(msg.timestamp).toLocaleString()}
                className="message"
              >
                {msg.text}
              </p>
              <Tooltip id={msg._id} place="top" />
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <img className="w-[270px] h-auto" src={NoMessage} alt="" />
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>

      {/* send message */}
      <form className="relative" onSubmit={handleSendMessage}>
        <Input
          type="text"
          name="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="py-5"
          placeholder="Start typing..."
        ></Input>
        <button
          type="submit"
          className="border p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white absolute top-1/2 -translate-y-1/2 right-5 scale-100 active:scale-90 transition duration-300 shadow"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

LiveChat.propTypes = {
  sendMail: PropTypes.string,
};

export default LiveChat;
