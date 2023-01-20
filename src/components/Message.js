import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  let owner = message.senderId === currentUser.uid && true;

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message);
  return (
    <div
      className={`flex gap-3 mb-2 | ${owner && "flex-row-reverse"}`}
      ref={ref}
    >
      <div className="flex flex-col text-gray-400 mb-[20px]">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="bg-[#ddddf7] h-[40px] w-[40px] rounded-[50%] object-cover"
        />
        <span>just now</span>
      </div>
      <div
        className={`max-w-[80%] flex flex-col gap-[10px] ${
          owner ? "items-end" : "items-start"
        }`}
      >
        <p
          className={`bg-white py-[10px] px-[20px]  | ${
            owner
              ? " bg-[#8da4f1] text-white rounded-l-lg rounded-br-lg"
              : "rounded-r-lg rounded-bl-lg"
          }`}
        >
          {message.text}
        </p>
        {message.img && (
          <img src={message.img} alt="" className="w-[50%] max-w-max" />
        )}
      </div>
    </div>
  );
};
export default Message;
