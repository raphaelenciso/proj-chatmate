import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import Message from "./Message";

const Messages = ({ img, setImg }) => {
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

  return (
    <div
      className={`bg-dark-bg-main p-[10px]  overflow-scroll ${
        img ? "h-[calc(100%-200px)]" : "h-[calc(100%-100px)]"
      }`}
    >
      {messages &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
    </div>
  );
};
export default Messages;
