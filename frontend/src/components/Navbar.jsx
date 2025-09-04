import React from 'react';

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo"> Hamdi Chat</span>
      <div className="user">
        <img src="https://cdn-icons-png.flaticon.com/128/11696/11696618.png" alt="" />
        <span>John</span>
        <button>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
