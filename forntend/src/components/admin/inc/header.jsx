import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logout clicked");

    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="/images/premium-logo-black@3x.png" alt="Premium Logo" />
      </div>
      <div className="icon-container">
        <div className="Icon-france">
          <img src="/images/fr@2x.png" alt="Icon France" />
          <span>France</span>
        </div>
        <div className="user-icon" onClick={toggleDropdown}>
          <img
            src="/images/picto-utilisateur-connecte@3x.png"
            alt="User Icon"
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
