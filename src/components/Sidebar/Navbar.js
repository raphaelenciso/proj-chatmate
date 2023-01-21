import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-dark-bg-neutral-lighter h-[50px] p-[10px] justify-between text-dark-text-primary">
      <span className=" font-bold  ">Chat App</span>
      <div className="flex items-center gap-[10px]">
        <img
          src={currentUser.photoURL}
          alt="img"
          className="bg-dark-bg-neutral h-[24px] w-[24px] rounded-[50%] object-cover"
        />
        <span>{currentUser.displayName}</span>
        <button
          className="bg-secondary-main rounded-lg hover:cursor-pointer px-2 py-1 text-xs "
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
