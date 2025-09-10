import React, { useContext, useState, useEffect } from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (!data.chatId || data.chatId === "null") return;

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      } else {
        setMessages([]);
      }
    });

    return () => unSub();
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className='messages'>
      {messages.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  );
};

export default Messages;
