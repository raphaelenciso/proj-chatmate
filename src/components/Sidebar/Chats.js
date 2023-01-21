import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div>
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="p-[10px] flex items-center text-white gap-[10px] cursor-pointer hover:bg-dark-bg-neutral-lighter"
              key={chat[0]}
              onClick={(e) => handleSelect(chat[1].userInfo)}
            >
              <img
                src={chat[1].userInfo.photoURL}
                alt="img"
                className="bg-dark-text-primary h-[50px] w-[50px] rounded-[50%] object-cover"
              />
              <div>
                <span className="font-bold text-md text-dark-text-primary ">
                  {chat[1].userInfo.displayName}
                </span>
                <p className="text-sm text-dark-text-secondary ">
                  {chat[1].lastMessage &&
                    chat[1].lastMessage.text.length > 20 &&
                    chat[1].lastMessage.text.substring(0, 20) + "..."}
                  {chat[1].lastMessage &&
                    chat[1].lastMessage.text.length <= 20 &&
                    chat[1].lastMessage.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
export default Chats;
