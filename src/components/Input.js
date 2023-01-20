import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img);
      const imageURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: imageURL,
        }),
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="h-[50px] bg-white p-[10px] flex items-center justify-between">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full border-none outline-none text-lg text-[#2f2d52] placeholder:text-slate-400"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex items-center gap-[10px]">
        <img src={Attach} alt="" className="w-[24px] cursor-pointer" />
        <input
          type="file"
          name=""
          id="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="img" className="w-[45px] cursor-pointer" />
        </label>

        <button
          className="text-white bg-[#8da4f1] px-4 py-1 rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
