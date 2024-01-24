import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      if (error.code.includes("auth")) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return { login, error };
};
