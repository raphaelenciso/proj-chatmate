import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    await login(email, password);
  };

  return (
    <div className="bg-[#a7bcff] h-screen flex justify-center items-center">
      <div className="bg-white w-[95%] max-w-sm px-16 py-8 rounded-lg flex flex-col gap-2 items-center ">
        <span className="text-[#5d5b8d] font-bold text-2xl">Chat App</span>
        <span className="text-[#5d5b8d] text-sm">Register</span>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
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

          <hr />
          <p className="text-red-500 text-sm">{error.split(":")[1]}</p>
          <button className="bg-[#7b96ec] p-2 font-bold hover:cursor-pointer text-white rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-[#5d5b8d] text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-black">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
