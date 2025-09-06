import React, { useState } from 'react';
import Add from "../img/addAvater.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase"; // import db here
import { doc, setDoc } from "firebase/firestore";
import { useNavigate ,Link} from 'react-router-dom';

const Register = () => {
  const [error, setErr] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

   try {
  // create user
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // convert file to base64
  let base64Image = "";
  if (file) {
    base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = err => reject(err);
    });
  }

  // update auth profile (only displayName, no photoURL because base64 is too long)
  await updateProfile(res.user, {
    displayName
    // photoURL: "" // leave empty or put a placeholder URL
  });

  // store in Firestore (can store base64 here)
  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    displayName,
    email,
    avatar: base64Image // store base64 here
  }
);
  await setDoc(doc(db,"userChats",res.user.uid),{});
  navigate("/")

  

} catch (err) {
  console.error(err);
  setErr(true);
}

  };

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Hamdi Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input style={{ display: "none" }} type="file" id='file' />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <span> Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
