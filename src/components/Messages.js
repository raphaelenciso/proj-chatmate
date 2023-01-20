import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);
  return (
    <div className="bg-[#ddddf7] p-[10px] h-[calc(100%-100px)] overflow-scroll">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Messages;
