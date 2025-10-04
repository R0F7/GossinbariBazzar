import { Input } from "@/components/ui/input";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import NoMessage from "../../../../../../assets/no-message-error.jpg";
import Unknown from "../../../../../../assets/unknown image.jpg";
import useAuth from "@/hooks/useAuth";
import { Tooltip } from "react-tooltip";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQueries } from "@tanstack/react-query";
import UserProfileModal from "../../../UserManagement/AllUser/UserProfile/UserProfileModal";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

const TicketConversation = () => {
  const location = useLocation();
  const { toEmail, ticket_id, status } = location.state || {};
  const {
    user_info_DB: { role },
    user: { email },
  } = useAuth();
  const messageEndRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["users"],
        queryFn: async () => {
          const { data } = await axiosSecure.get("/users");
          return data;
        },
      },
      {
        queryKey: ["ticketDetails", ticket_id],
        queryFn: async () => {
          const res = await axiosSecure.get(`/ticket/${ticket_id}`);
          return res.data;
        },
      },
      {
        queryKey: ["order-data-for-admin"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/order-for-admin`);
          return res.data;
        },
      },
    ],
  });

  const [users, ticketDetails, orderData] = results.map((r) => r.data);
  const isLoading = results.some((r) => r.isLoading);

  useEffect(() => {
    // Join a ticket room
    socket.emit("joinTicket", ticket_id);

    // Load previous ticket messages when the chat starts
    socket.emit("loadTicketMessages", ticket_id);

    // Listen for incoming ticket messages
    socket.on("previousTicketMessages", (history) => {
      setMessages(history);
    });

    socket.on("receiveTicketMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Auto scroll to the bottom when a new message arrives
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      socket.off("receiveTicketMessage");
      socket.off("previousTicketMessages");
    };
  }, [ticket_id]);

  if (isLoading) return "Loading...";

  const matchedUser = users.find((user) => user.email === toEmail);
  const matchedOrders = orderData.filter(
    (order) => order?.order_owner_info.email === toEmail
  );

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const userData = {
    name: matchedUser?.name || "N/A",
    email: matchedUser?.email || "N/A",
    phone: matchedUser?.number || "N/A",
    photo: matchedUser?.image_url || "",
    address: matchedUser?.address || "N/A",
    shippingAddress: matchedUser?.address || "N/A",
    totalOrders: matchedOrders.length,
    lastOrderDate: matchedOrders[matchedOrders.length - 1]?.createdAt
      ? new Date(
          matchedOrders[matchedOrders.length - 1]?.createdAt
        ).toLocaleDateString("en-US", options)
      : "N/A",
    createdAt: new Date(matchedUser?.timestamp).toLocaleDateString(
      "en-GB",
      options
    ),
    lastLogin: matchedUser?.lastLogin
      ? new Date(matchedUser?.lastLogin).toLocaleDateString("en-GB", options)
      : "N/A",
    status: matchedUser?.isActive ? "Active" : "Inactive",
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.text.value;

    if (message.trim() !== "") {
      const data = {
        ticket_id,
        sender_type: role,
        message,
      };
      socket.emit("sendTicketMessage", data);
      // refetch();
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6">
      <div className="w-3/4 bg-white h-full rounded-md shadow px-4 py-3 flex flex-col justify-between">
        {/* header */}
        <div>
          {email !== toEmail && (
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-blue-500">
                  <img
                    className="w-full h-full rounded-full"
                    src={matchedUser?.image_url || Unknown}
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-1.5 -mb-1">
                    {matchedUser?.name}{" "}
                    {matchedUser?.isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{matchedUser?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(true), setUserInfo(userData);
                }}
                className="border border-blue-500 p-1.5 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 scale-100 active:scale-90"
              >
                <FaInfoCircle />
              </button>
            </div>
          )}

          <div className="border-b pb-1">
            <h4 className="text-gray-700 font-semibold">
              {ticketDetails.subject}
            </h4>
            <p className="text-gray-500 text-sm">{ticketDetails.description}</p>
          </div>
        </div>

        {/* chat */}
        <div className="h-full overflow-y-auto p-4">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.sender_type !== role ? "opposite-msg" : "my-msg flex"
                } mb-4`}
              >
                <p
                  data-tooltip-id={`tooltip-${idx}`}
                  data-tooltip-content={new Date(
                    msg.timestamp
                  ).toLocaleString()}
                  className="message"
                >
                  {msg.message}
                </p>
                <Tooltip id={`tooltip-${idx}`} place="top" />
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
            disabled={status === "Closed"}
            onChange={(e) => setMessage(e.target.value)}
            className="py-5"
            placeholder="Start typing..."
          ></Input>
          <button
            type="submit"
            disabled={status === "Closed"}
            className="border p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white absolute top-1/2 -translate-y-1/2 right-5 scale-100 active:scale-90 transition duration-300 shadow disabled:cursor-not-allowed"
          >
            <IoMdSend />
          </button>
        </form>
      </div>

      <UserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={userInfo}
      ></UserProfileModal>
    </div>
  );
};

export default TicketConversation;
