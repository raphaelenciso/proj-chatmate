import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="flex-1 border-r-[1px] bg-[#3d3c61] ">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
export default Sidebar;
