import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useEffect, useState } from "react";
import { GrFormClock } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";

const Notifications = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isExpend, setIsExpend] = useState(null);
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
  //   console.log(data);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let key in intervals) {
      let value = Math.floor(seconds / intervals[key]);

      if (value >= 1) {
        return `${value}${key.charAt(0)} ago`;
      }
    }
    return "Just Now";
  };

  return (
    <section className="bg-[#F0EEEC] g-[#6B7084] min-h-screen pb-1">
      <div className="flex items-center p-3.5 gap-2 bg-[#51566E] text-white sticky top-0 z-50">
        <IoIosNotifications className="w-11 h-10 p-1.5 bg-[#F69395] rounded-md " />
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="bg-[#E26FA1] h-1.5 w-11 absolute top-[62px] left-3.5 "></div>
      </div>

      <div className="w-[450px] m-3.5">
        {data.map((notification, idx) => (
          <div
            key={notification._id}
            onMouseEnter={() => setIsExpend(idx)}
            onMouseLeave={() => setIsExpend(null)}
            className="flex items-center bg-[#FFFFFF] my-2 px-3 py-4 gap-2 rounded-md shadow relative transition duration-1000 hover:scale-105 h-[90px] border-x border-[#F69395] hover:border-x-2"
          >
            <div>
              {/* <IoIosNotifications className="w-10 h-10 p-1.5 bg-[#F69395] text-white rounded-md " /> */}
            </div>
            <div>
              <h6 className="absolute right-4 top-2 flex">
                <GrFormClock className="mt-px" />
                <span className="text-xs font-semibold text-[#595959]">
                  {timeAgo(notification?.timestamp)}
                </span>
              </h6>
              <h4 className="font-bold text-[#595959] mb-1">
                {notification?.category}
              </h4>
              <p
                className={`text-[#747474] text-sm transition-all duration-500 ease-in-out overflow-hidden ${
                  idx === isExpend
                    ? "max-h-40 max-w-[400px] "
                    : "max-h-4 max-w-[400px]"
                }`}
              >
                {notification?.message.length < 60 || idx === isExpend ? (
                  <span>{notification?.message}</span>
                ) : (
                  <>
                    <span>{notification?.message.slice(0, 50)}...</span>
                    <span className={`h-0 text-white`}>
                      {notification?.message.slice(
                        50,
                        notification?.message.length
                      )}
                    </span>
                  </>
                )}

                {/* {notification?.message.length < 60 || isExpend.expend && idx === isExpend.idx
                  ? notification?.message
                  : notification?.message.slice(0, 50) + "..."}
                  */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;
