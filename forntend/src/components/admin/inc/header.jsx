import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="/images/premium-logo-black@3x.png" alt="Premium Logo" />
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

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
