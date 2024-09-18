import React, { useState } from "react";
import { FaBars, FaHome, FaEnvelope } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import {HiX} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
import './styles.scss'

const data = [
  {
    label: <FaHome size={30} />,
    to: "/",
  },
  {
    label: <RiContactsBook3Fill size={30} />,
    to: "/contact",
  },
  {
    label: <FaEnvelope size={30} />,
    to: "/message",
  },
  {
    label: <IoSettingsSharp size={30} />,
    to: "/settings",
  },
];

const NavBar = () => {
    const [toggleIcon, setToggleIcon] = useState(false)
 
    const location = useLocation();

    const handleToggleIcon = ()=>{
        setToggleIcon(!toggleIcon)
    }

  return (
    <div>
       <button className={`nav-icon ${toggleIcon ? "active" : ""}`} onClick={handleToggleIcon}>
            {
                toggleIcon ? <HiX color="#fff" size={30} /> : <FaBars color="#000" size={25}/>
            }
        </button>
      <nav  className={`navbar ${toggleIcon ? "active" : ""}`}>

        <ul>
        {data.map((item, key) => (
            <li key={key} className={`navbar__menu__item ${location.pathname === item.to ? "active" : ""}`}>
            <Link className="navbar__menu__item__links" to={item.to}>
                {item.label}
            </Link>
        </li>
          ))}
        </ul>
       
      </nav>
    </div>
  );
};

export default NavBar;
