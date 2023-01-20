import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-[#a7bcff] h-screen flex justify-center items-center ">
      <div className=" border-white border-[1px] rounded-lg w-[95%] max-w-6xl h-[80%] flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
