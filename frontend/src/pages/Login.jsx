import React from 'react';
import Add from "../img/addAvater.png"
const Login = () => {
  return (
    <div className='formContainer'>
       <div className="formWrapper">
        <span className="logo">Hamdi Chat</span>
        <span className="title">Login</span>
        <form >
            <input type="email"  placeholder='email'/>
            <input type="password" placeholder='password' />
         
            <button>Sign In</button>
        </form>
        <p>You dont have an account? Regier</p>
       </div>
     </div>
  );
}

export default Login;
