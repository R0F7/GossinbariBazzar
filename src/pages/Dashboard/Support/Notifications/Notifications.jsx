import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

const Notifications = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const notifications = useGetSecureData(
    "notification",
    `/notifications/${user?.email}`
  );

  //   const dame_notifications = useGetData("notification", "./notification.json");
  //   console.log(dame_notifications);

  useEffect(() => {
    fetch("/notification.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

  return (
    <section className="bg-[#F0EEEC] g-[#6B7084] min-h-screen">
      <div className="flex items-center p-3.5 gap-2 bg-[#51566E] text-white relative">
        <IoIosNotifications className="w-11 h-10 p-1.5 bg-[#F69395] rounded-md " />
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="bg-[#E26FA1] h-1.5 w-11 absolute top-[62px] left-3.5 "></div>
      </div>

      <div className="w-[500px] m-3.5">
        {data.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center bg-[#FFFFFF] my-2 px-3 py-3.5 gap-2 rounded-md shadow"
          >
            <div>
              <IoIosNotifications className="w-10 h-10 p-1.5 bg-[#F69395] text-white rounded-md " />
            </div>
            <div>
              <h4 className="font-bold text-[#595959]">
                {notification?.category}
              </h4>
              <p className="text-[#747474]">
                {notification?.message.length > 60
                  ? notification?.message.slice(0, 50) + "..."
                  : notification?.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;
