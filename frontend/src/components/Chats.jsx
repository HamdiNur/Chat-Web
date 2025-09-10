import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const Chats = () => {
  const [users, setUsers] = useState([]); // all users
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
  if (!currentUser?.uid) return;

  const fetchUsers = async () => {
    try {
      const q = collection(db, "users");
      const querySnapshot = await getDocs(q);

      for (let docSnap of querySnapshot.docs) {
        const user = docSnap.data();
        if (user.uid === currentUser.uid) continue; // skip yourself

        const chatId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

        // listen to changes in userChats document in real-time
        onSnapshot(doc(db, "userChats", currentUser.uid), (userChatsDoc) => {
          const lastMsgData = userChatsDoc.exists()
            ? userChatsDoc.data()[chatId]?.lastMessage || {}
            : {};

          const lastMessage = lastMsgData.text || "";
          const lastMessageDate =
            userChatsDoc.exists()
              ? userChatsDoc.data()[chatId]?.date || null
              : null;

          setUsers((prev) => {
            const others = prev.filter((u) => u.uid !== user.uid);
            return [...others, { ...user, lastMessage, lastMessageDate }];
          });
        });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  fetchUsers();
}, [currentUser?.uid]);

// ✅ sort users by latest date (so newest on top)
const sortedUsers = [...users].sort((a, b) => {
  const dateA = a.lastMessageDate?.toMillis
    ? a.lastMessageDate.toMillis()
    : 0;
  const dateB = b.lastMessageDate?.toMillis
    ? b.lastMessageDate.toMillis()
    : 0;
  return dateB - dateA;
});

  // Handle selecting a user to start chat
  const handleSelect = async (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatRef = doc(db, "chats", combinedId);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            avatar: user.avatar || "",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            avatar: currentUser.avatar || "",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // // sort users by last message date (latest first)
  // const sortedUsers = [...users].sort((a, b) => {
  //   const dateA = a.lastMessageDate?.toMillis ? a.lastMessageDate.toMillis() : 0;
  //   const dateB = b.lastMessageDate?.toMillis ? b.lastMessageDate.toMillis() : 0;
  //   return dateB - dateA;
  // });

  return (
    <div className="chats">
      {sortedUsers.map((user) => (
        <div
          key={user.uid}
          className="userChat"
          onClick={() => handleSelect(user)}
        >
          <img
            src={user.avatar || "/defaultAvatar.png"}
            alt={user.displayName}
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p>{user.lastMessage}</p> {/* last message appears */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
