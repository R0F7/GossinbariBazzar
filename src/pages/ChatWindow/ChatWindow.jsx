import { Input } from "@/components/ui/input";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import Unknown from "../../assets/unknown image.jpg";
import NoMessage from "../../assets/no-message-error.jpg";
import UserProfileModal from "../Dashboard/Admin/UserManagement/AllUser/UserProfile/UserProfileModal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const socket = io(import.meta.env.VITE_API_URL);

const ChatWindow = () => {
  const {
    user_info_DB: { role },
    user: { email },
  } = useAuth();
  const [toEmail, setToEmail] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const messageEndRef = useRef(null);

  // const toEmail = "rakibulhassanrafi075@gmail.com";
  // const email = "mr@admin.com";

  const {
    data: users,
    isLoading,
    refetch,
  } = useGetSecureData("conversations", `/conversations/${email}`);
  const { data: orderData = [] } = useGetSecureData(
    "order-data-for-admin",
    `/order-for-admin`
  );
  // console.log(users);

  const { data: admins } = useGetSecureData("admins", `/users?role=admin`);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

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

  useEffect(() => {
    if (!users || isLoading) return;

    setToEmail(users[0].email);
  }, [users, isLoading]);

  if (isLoading) return "Loading...";

  const matchedUser = users.find((user) => user.email === toEmail);
  const matchedOrders = orderData.filter(
    (order) => order?.order_owner_info.email === email
  );

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

  const lastName = (fullName) => {
    const splitName = fullName.split(" ");
    return splitName[splitName.length - 1];
  };

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
      refetch();
      setMessage("");
    }
  };

  return (
    <section className="p-6 x-8 h-screen bg-[rgb(247,246,249)]">
      <div className="flex items-center gap-4 h-full">
        {/* chat bar */}
        <aside className="w-1/4 h-full bg-white rounded-md shadow p-4 pl-0 overflow-y-auto flex flex-col justify-between">
          <div className="overflow-y-auto">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => setToEmail(user?.email)}
                className="flex items-center gap-2 hover:bg-blue-100 rounded-md transition duration-300 cursor-pointer "
              >
                <div
                  className={`w-1 h-[50px] ${
                    toEmail === user.email ? "bg-blue-500" : "bg-white"
                  } rounded-full`}
                ></div>

                <div className="flex items-center gap-2 border-b py-1.5 w-full">
                  <div className="w-10 h-10 rounded-full border border-blue-500">
                    <img
                      className="w-full h-full rounded-full"
                      src={user?.image_url || Unknown}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-1.5 -mb-0.5">
                      {user?.name} <span className="text-sm">({user?.role})</span>
                      {user?.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </h4>
                    <p>
                      {user.form === email ? (
                        <>
                          <strong>you: </strong>{" "}
                          {user.lastMessage.length < 27
                            ? user.lastMessage
                            : user.lastMessage.slice(0, 27) + "..."}
                        </>
                      ) : (
                        <>
                          <strong>
                            {lastName(user.name).length > 8
                              ? lastName(user.name).slice(0, 8)
                              : lastName(user.name)}
                            :{" "}
                          </strong>
                          {user.lastMessage.length < 25
                            ? user.lastMessage
                            // : lastName(user.name).length < 8
                            // ? user.lastMessage.slice(0, 25) + "..."
                            : user.lastMessage.slice(0, 25) + "..."}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {role !== "admin" && (
            <div className="max-h-[250px] overflow-y-auto">
              <p className="border text-center bg-blue-600 text-white py-0.5 mb-0.5 ml-4 text-sm font-semibold rounded-md">
                Admins
              </p>
              {admins.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setToEmail(user?.email)}
                  className="flex items-center gap-2 hover:bg-blue-100 rounded-md transition duration-300 cursor-pointer "
                >
                  <div
                    className={`w-1 h-[50px] ${
                      toEmail === user.email ? "bg-blue-500" : "bg-white"
                    } rounded-full`}
                  ></div>

                  <div className="flex items-center gap-2 border-b py-1.5 w-full">
                    <div className="w-10 h-10 rounded-full border border-blue-500">
                      <img
                        className="w-full h-full rounded-full"
                        src={user?.image_url || Unknown}
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-1.5 -mb-0.5">
                        {user?.name}
                        {user?.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </h4>
                      {/* <p>
                        {user.form === email && user.lastMessage ? (
                          <>
                            <strong>you: </strong>{" "}
                            {user.lastMessage.length < 27
                              ? user.lastMessage
                              : user.lastMessage.slice(0, 27) + "..."}
                          </>
                        ) : (
                          <>
                            <strong>Admin: </strong>
                            {user.lastMessage.length < 27
                              ? user.lastMessage
                              : user.lastMessage.slice(0, 27) + "..."}
                          </>
                        )}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* chat box */}
        <div className="w-3/4 bg-white h-full rounded-md shadow px-4 py-3 flex flex-col justify-between">
          {/* header */}
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
                <p>{matchedUser?.email}</p>
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

          {/* chat */}
          <div className="h-full overflow-y-auto p-4">
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
                    data-tooltip-content={new Date(
                      msg.timestamp
                    ).toLocaleString()}
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
      </div>

      <UserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={userInfo}
      ></UserProfileModal>
    </section>
  );
};

export default ChatWindow;
