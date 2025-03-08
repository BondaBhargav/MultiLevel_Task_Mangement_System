
import { useEffect, useState } from "react";
import "./header.css"
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose, IoMdMenu } from "react-icons/io";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate=useNavigate()
    // Handle menu toggle
    const handleMenuToggle = () => {
      setShowMenu((prevState) => !prevState);
    };
  
    // Handle dropdown toggle
    const handleDropdownToggle = (index) => {
      setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
    };
  
    // Remove dropdown styles on resize (for larger screens)
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setShowMenu(false);
          setActiveDropdown(null); // Close all dropdowns on larger screens
        }
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    return (
      <header className="header">
        <nav className="nav container">
          <div className="nav__data">
            <Link to="/" className="nav__logo">
              <img
                className="logo"
                src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1401371360/xothbfwggkz86tzi0gog.png"
                alt="logo"
              />
            </Link>
            <div
              className={`nav__toggle ${showMenu ? "show-icon" : ""}`}
              onClick={handleMenuToggle}
            >
              {showMenu ? <IoIosClose /> : <IoMdMenu />}
            </div>
          </div>
  
          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              
            <li>{'bhargav'}</li>
            
                 <li>
                <button className="logout" onClick={()=>{window.localStorage.removeItem("token"); navigate("/login")}}>logout</button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  };


  export default Header