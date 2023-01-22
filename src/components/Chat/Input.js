import Img from "../../img/img.png";
import { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setText("");
    setImg(null);

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
  };

  return (
    <div className="h-[50px] bg-dark-bg-neutral p-[10px] flex items-center justify-between relative">
      <input
        type="text"
        placeholder="Type something..."
        className="w-[100%] border-none outline-none bg-dark-bg-neutral-lighter text-dark-text-primary placeholder:text-dark-text-secondary placeholder:text-md rounded-2xl px-4 py-2 mr-2 pr-[60px]"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        value={text}
      />
      <div className="flex items-center gap-[10px] absolute right-[75px] | sm:right-[82px] ">
        <input
          type="file"
          name=""
          id="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src={Img}
            alt="img"
            className="w-[25px] cursor-pointer hover:opacity-80 | sm:w-[30px]"
          />
        </label>
      </div>
      <button className="text-primary-main px-2 " onClick={handleSend}>
        <IoSend className="text-[1.5rem] hover:opacity-80 | sm:text-[2rem]" />
      </button>
    </div>
  );
}
