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
    <div>
      <div className="App-logo">
        <div className="Content">
          <img src="/images/premium-logo-black@3x.png" alt="logo Premium" />
        </div>
        <div className="Icons">
          <img src="/images/fr@2x.png" alt="Icon France" />
          France
          <div className="user-icon" onClick={toggleDropdown}>
            <img
              src="/images/picto-utilisateur-connecte@3x.png"
              alt="Icon User"
            />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
