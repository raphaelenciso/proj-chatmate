import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  const { data } = useContext(ChatContext);

  return (
    <div
      className={`${
        data.chatId && "hidden"
      } flex-1 border-r-[1px] bg-dark-bg-neutral | sm:block sm:flex-1 `}
    >
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
export default Sidebar;
