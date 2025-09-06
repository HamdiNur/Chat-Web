import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      if (currentUser?.uid) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setAvatar(userDoc.data().avatar || "");
        }
      }
    };
    fetchAvatar();
  }, [currentUser]);

  return (
    <div className="navbar">
      <span className="logo">Hamdi Chat</span>
      <div className="user">
        <img src={avatar || "/defaultAvatar.png"} alt="User Avatar" />
        <span>{currentUser?.displayName || "Guest"}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};


export default Navbar;
