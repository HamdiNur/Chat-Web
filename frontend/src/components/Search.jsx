import React, { useContext, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import {  db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser}=useContext(AuthContext)

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

  const handleSelect= async()=>{
    //check wheether the groupChat in firestore) exists , if not create
    const combinedId=currentUser.uid>user.uid
    ?currentUser.uid+ user.uid
   : user.uid +currentUser.uid;
   try {
const res = await getDoc(doc(db,"chats",combinedId));
if (!res.exists()) {
  //create chats in chats collection
await setDoc(doc(db, "chats", combinedId), { messages: [] });
   // create user chats
await updateDoc(doc(db,"userChats",currentUser.uid),{
  [combinedId+".userInfo"]:{
    uid:user.uid,
    displayName:user.displayName,
    photoUrl:user.avater
  },
  [combinedId+".date"]:serverTimestamp()
});
await updateDoc(doc(db,"userChats",user.uid),{
  [combinedId+".userInfo"]:{
    uid:currentUser.uid,
    displayName:currentUser.displayName,
    photoUrl:currentUser.avater
  },
  [combinedId+".date"]:serverTimestamp()
});



}
   } catch (error) {
    
   }
    // create user chats
      setUser(null);
  setUsername("")
  }


  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      {err && <span>User Not Found</span>}

      {user && (
        <div className="userChat" onClick={handleSelect}>
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
