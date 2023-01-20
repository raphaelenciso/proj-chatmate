import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-[6] | sm:block sm:flex-[4] md:flex-[2]">
      <div className="h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-slate-300">
        <span>{data.user.displayName}</span>
        <div className="flex gap-2 ">
          <img src={Cam} alt="cam" className="h-[24px]" />
          <img src={Add} alt="add" className="h-[24px]" />
          <img src={More} alt="more" className="h-[24px]" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
export default Chat;
