import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/searchUser?nom=${encodeURIComponent(searchQuery)}`); 
    }
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="/images/premium-logo-black@3x.png" alt="Premium Logo" />
      </div>

      {user && (
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search_button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <Link to="/searchUser" className="search-icon-link"></Link>
        </form>
      )}

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
