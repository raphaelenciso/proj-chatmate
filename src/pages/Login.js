import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
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
    <div className="bg-dark-bg-neutral w-[90%] max-w-sm px-12 py-8 rounded-lg flex flex-col gap-2 items-center ">
      <span className="text-primary-main font-bold text-2xl">ChatMate</span>
      <span className="text-primary-darker text-sm">Login</span>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <TextField type="email" placeholder="email" />
        <TextField type="password" placeholder="password" />

        <p className="text-red-500 text-sm">{error.split(":")[1]}</p>
        <Button text="Login" />
      </form>
      <p className="text-dark-text-secondary text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="underline text-dark-text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};
export default Login;
