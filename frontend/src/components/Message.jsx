import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [senderAvatar, setSenderAvatar] = useState("");
  const ref = useRef();

  // scroll into view when this message mounts/updates
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // fetch sender avatar from Firestore
  useEffect(() => {
    const fetchAvatar = async () => {
      const uid = message.senderId;
      if (!uid) return;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setSenderAvatar(userDoc.data().avatar || "/defaultAvatar.png");
      } else {
        setSenderAvatar("/defaultAvatar.png");
      }
    };

    fetchAvatar();
  }, [message.senderId]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img src={senderAvatar} alt="sender avatar" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="attachment" />}
      </div>
    </div>
  );
};

export default Message;
