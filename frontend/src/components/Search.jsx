import React, { useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser(userDoc.data());
        setErr(false);
        console.log(userDoc.data()); // 👈 see avatar in console
      } else {
        setUser(null);
        setErr(true);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") handleSearch();
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {err && <span>User Not Found</span>}

      {user && (
        <div className="userChat">
          <img
            src={user.avatar && user.avatar.trim() !== "" ? user.avatar : "/defaultAvatar.png"}
            alt="User Avatar"
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
