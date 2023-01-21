import Chat from "../components/Chat/Chat";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className=" border-white border-[1px] rounded-lg w-[95%] max-w-6xl h-[80%] flex overflow-hidden">
      <Sidebar />
      <Chat />
    </div>
  );
}
