import Add from "../img/add.png";

import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const { register, error } = useRegister();
  const [avatar, setAvatar] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    await register(displayName, email, password, avatar);
  }

  return (
    <div className="bg-[#a7bcff] h-screen flex justify-center items-center">
      <div className="bg-white w-[95%] max-w-sm px-16 py-8 rounded-lg flex flex-col gap-2 items-center ">
        <span className="text-[#5d5b8d] font-bold text-2xl">Chat App</span>
        <span className="text-[#5d5b8d] text-sm">Register</span>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2  border-b border-b-[#a7bcff] focus:outline-none focus:border-2 focus:border-[#a7bcff] focus:rounded-lg  "
            placeholder="display name"
          />
          <input
            type="email"
            className="p-2  border-b border-b-[#a7bcff] focus:outline-none focus:border-2 focus:border-[#a7bcff] focus:rounded-lg  "
            placeholder="email"
          />
          <input
            type="password"
            className="p-2  border-b border-b-[#a7bcff] focus:outline-none focus:border-2 focus:border-[#a7bcff] focus:rounded-lg  "
            placeholder="password"
          />

          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="flex items-center gap-2 text-[#8da4fa] text-sm hover:cursor-pointer"
          >
            <img
              src={avatar ? URL.createObjectURL(avatar) : Add}
              alt="avatar"
              className="w-[40px] h-[40px] rounded-[50%]"
            />
            <span className="underline">Add an avatar</span>
          </label>
          <hr />
          <p className="text-red-500 text-sm">{error.split(":")[1]}</p>
          <button className="bg-[#7b96ec] p-2 font-bold hover:cursor-pointer text-white rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-[#5d5b8d] text-sm mt-4">
          {" "}
          Have an account?{" "}
          <Link to="/login" className="underline text-black">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
export default Register;
