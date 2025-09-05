import React from 'react';
import Add from "../img/image.png"
import Attach from "../img/Attach.png"

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder=' Type Something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file'/>
        <label htmlFor="file">
          <img src={Add} alt="" />
        </label>
        <button>Send</button>
      </div>
    
    </div>
  );
}

export default Input;
