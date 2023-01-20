import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { setDoc, doc } from "firebase/firestore";

import { auth, storage, db } from "../firebase";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const register = async (displayName, email, password, avatar) => {
    setError("");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, email.split("@")[0]);

      await uploadBytesResumable(storageRef, avatar);
      const imageURL = await getDownloadURL(storageRef);

      await updateProfile(response.user, {
        displayName,
        photoURL: imageURL,
      });

      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName,
        email,
        photoURL: imageURL,
      });

      await setDoc(doc(db, "userChats", response.user.uid), {});

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return { register, error };
};
