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
      setError(error.message);
    }
  };

  return { login, error };
};
