import Messages from "./Messages";
import Input from "./Input";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { BiArrowBack } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [img, setImg] = useState(null);

  const handleBack = () => {
    dispatch({ type: "REMOVE_USER" });
  };

  useEffect(() => {
    dispatch({ type: "REMOVE_USER" });
  }, [dispatch]);

  return (
    <div
      className={`${
        !data.chatId && "hidden"
      } flex-1  | sm:block sm:flex-[2.5] `}
    >
      {data.user.displayName && (
        <>
          <div className="h-[50px] bg-primary-darker flex items-center justify-start  text-dark-text-primary | sm:p-[10px]">
            <BiArrowBack
              className=" inline-block sm:hidden mr-2 text-[2.2rem] rounded-[50%] p-2 hover:bg-primary-lighter "
              onClick={handleBack}
            />
            <img
              src={data.user.photoURL}
              alt="icon"
              className="bg-dark-text-primary h-[25px] w-[25px] rounded-[50%] object-cover mr-2"
            />
            <span className="font-bold text-xl">
              {data.user.displayName === currentUser.displayName
                ? "me"
                : data.user.displayName}
            </span>
          </div>
          <Messages img={img} setImg={setImg} />
          <Input img={img} setImg={setImg} />
        </>
      )}
    </div>
  );
};
export default Chat;
