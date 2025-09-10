import React, { useContext, useState } from 'react';
import Add from "../img/image.png";
import Attach from "../img/Attach.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text && !img) return; // prevent empty messages

    // Convert image file to base64 if selected
    let base64Image = null;
    if (img) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
    }

    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text || "",
          img: base64Image, // store base64 image
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId+ ".lastMessage"]:{
          text
        },
        [data.chatId +".date"]:serverTimestamp()
      });
           await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId+ ".lastMessage"]:{
          text
        },
        [data.chatId +".date"]:serverTimestamp()
      });

      // Clear input after sending
      setText("");
      setImg(null);
      document.getElementById("file").value = null; // reset file input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className='input'>
    <input
      type="text"
      placeholder="Type something..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSend();
        }
      }}
    />
      <div className="send">
        <img src={Attach} alt="Attach" />
        <input
          type="file"
          style={{ display: "none" }}
          id='file'
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Add} alt="Add" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
