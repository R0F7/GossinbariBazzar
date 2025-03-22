// import FAQ from "./FAQ/FAQ";
// import ChatComponent from "./LiveChat/LiveChat";

// const HelpAndSupport = () => {
//   return (
//     <section className="p-6">
//       <div className="flex">
//         <div className="w-1/2">
//           <h1 className="text-3xl mb-6 font-semibold">
//             FAQs{" "}
//             <span className="text-base font-normal">
//               (Frequently Asked Questions)
//             </span>
//           </h1>
//           <FAQ></FAQ>
//         </div>
//         <div className="w-1/2">
//           <div className="w-[500px] m-auto">
//             <h1 className="text-3xl mb-6 font-semibold">
//             Live Chat{" "}
//             <span className="text-base font-normal">
//               ( 9 AM - 6 PM, Monday to Friday)
//             </span>
//           </h1>
//             <ChatComponent userType="User" email={'wwwrafikhan075@gmail.com'} />
//             {/* <hr />
//             <h2>Admin Panel</h2>
//             <ChatComponent userType="Admin" email={'wwwrafikhan075@gmail.com'}/> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HelpAndSupport;

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { auth, db } from "../../../../../firebase/firebase.config";
import Chat from "./LiveChat/LiveChat";
import { auth, db } from "../../../../firebase/firebase.config";

const HelpAndSupport = () => {
  const [chatId, setChatId] = useState(null);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchChat = async () => {
      if (!currentUserId) return;

      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("userId", "==", currentUserId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setChatId(querySnapshot.docs[0].id); // Use the first matching chat document
      } else {
        // Optionally, create a new chat document if none exists
        console.log("No chat found for this user.");
      }
    };

    fetchChat();
  }, [currentUserId]);

  return (
    <section className="p-6">
      <div className="flex">
        <div className="w-1/2">
          <h1 className="text-3xl mb-6 font-semibold">
            FAQs <span className="text-base font-normal">(Frequently Asked Questions)</span>
          </h1>
          {/* FAQ Component */}
        </div>
        <div className="w-1/2">
          <div className="w-[500px] m-auto">
            <h1 className="text-3xl mb-6 font-semibold">
              Live Chat <span className="text-base font-normal">(9 AM - 6 PM, Monday to Friday)</span>
            </h1>
            {chatId ? <Chat chatId={chatId} /> : <p>Loading chat...</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpAndSupport;

