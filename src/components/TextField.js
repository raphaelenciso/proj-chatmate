import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const TextField = ({ type, placeholder, required, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div class="relative">
      <input
        required={required}
        type={
          type === "password"
            ? showPassword === true
              ? "text"
              : "password"
            : type
        }
        id={id}
        className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        for={id}
        className="absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto "
      >
        {placeholder}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-[15px] z-10"
          onClick={() => setShowPassword((prevValue) => !prevValue)}
        >
          {showPassword === true ? (
            <FaEyeSlash size={25} color="#0080ff" />
          ) : (
            <FaEye size={25} color="#0080ff" />
          )}
        </button>
      )}
    </div>
  );
};
