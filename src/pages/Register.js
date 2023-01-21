import Add from "../img/add.png";

import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";

const Register = () => {
  const { register, error, setError } = useRegister();
  const [avatar, setAvatar] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!avatar) {
      return setError("avatar is required");
    }

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    await register(displayName, email, password, avatar);
  }

  return (
    <div className="bg-dark-bg-neutral w-[90%] max-w-sm px-16 py-8 rounded-lg flex flex-col gap-2 items-center ">
      <span className="text-primary-main font-bold text-2xl mb-4">
        Register
      </span>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <TextField type="text" placeholder="display name" />
        <TextField type="email" placeholder="email" />
        <TextField type="password" placeholder="password" />

        <input
          type="file"
          id="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <label
          htmlFor="file"
          className="flex items-center gap-2 text-dark-text-primary text-sm hover:cursor-pointer"
        >
          <img
            src={avatar ? URL.createObjectURL(avatar) : Add}
            alt="avatar"
            className="w-[40px] h-[40px] rounded-[50%]"
          />
          <span className="underline">Add an avatar</span>
        </label>

        <p className="text-red-500 text-sm">
          {error.includes(":") ? error.split(":")[1] : error}
        </p>
        <Button text="Sign Up" />
      </form>
      <p className="text-dark-text-secondary text-sm mt-4">
        Have an account?{" "}
        <Link to="/login" className="underline text-dark-text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};
export default Register;
