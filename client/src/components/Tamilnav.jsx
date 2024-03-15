import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import Signin from '../components/Signin';

const Tamilnav = ({ showMenu, toggleMenu }) => {
  return (
    <>
      <nav data-aos="zoom-in">
        <input type="checkbox" id="check" checked={showMenu} />
        <label htmlFor="check" className="checkbtn" onClick={toggleMenu}>
      
        </label>
        <label className="logo">
          கொங்கு - VMS
        </label>
        <ul id="navbar" className={showMenu ? "show" : ""}>
          <li className="active" >
            <Link className='Admin' to="Signin" spy={true} smooth={true} offset={-70} duration={800} onClick={toggleMenu}>
              நிர்வாகி
            </Link>
            <Link className="Tamil" to="/" spy={true} smooth={true} offset={-70} duration={800} onClick={toggleMenu}>
             ஆங்கிலம்
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Tamilnav;
