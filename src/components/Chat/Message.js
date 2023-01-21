import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  let owner = message.senderId === currentUser.uid && true;

  const displayTimeAgo = (seconds) => {
    const currentTime = new Date().getTime() / 1000;
    const timeDifference = currentTime - seconds;

    if (timeDifference < 60) {
      return "Just now";
    } else if (timeDifference > 60 && timeDifference <= 3600) {
      return Math.floor(timeDifference / 60) + "m ago";
    } else if (timeDifference > 3600 && timeDifference <= 86400) {
      return Math.floor(timeDifference / 3600) + "h ago";
    } else if (timeDifference > 86400 && timeDifference <= 604800) {
      return Math.floor(timeDifference / 86400) + "w ago";
    } else if (timeDifference > 604800 && timeDifference <= 2629743) {
      return Math.floor(timeDifference / 604800) + "mo ago";
    } else if (timeDifference > 2629743 && timeDifference <= 31556926) {
      return Math.floor(timeDifference / 2629743) + "yr ago";
    }
  };

  const cutString = (string) => {
    let newString = "";
    let numOfChars = 24;

    for (let i = 0; i <= Math.ceil(string.length / numOfChars); i++) {
      newString +=
        string.substring(i * numOfChars, (i + 1) * numOfChars) + "\n";
    }

    return newString;
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`flex gap-3 mb-2 | ${owner && "flex-row-reverse"}`}
      ref={ref}
    >
      <div className="flex flex-col text-dark-text-secondary mb-[20px]">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="bg-dark-text-primary h-[40px] w-[40px] rounded-[50%] object-cover"
        />
        <span>{displayTimeAgo(message.date.seconds)}</span>
      </div>
      <div
        className={`max-w-[80%] flex flex-col gap-[10px] ${
          owner ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`bg-dark-bg-neutral-lighter py-[10px] px-[20px] text-white max-w-[245px] | ${
            owner
              ? " bg-primary-main rounded-l-lg rounded-br-lg"
              : "rounded-r-lg rounded-bl-lg"
          }`}
        >
          {message.text.length > 24 ? cutString(message.text) : message.text}
        </div>
        {message.img && (
          <img src={message.img} alt="img" className="w-[50%] max-w-max" />
        )}
      </div>
    </div>
  );
};
export default Message;
