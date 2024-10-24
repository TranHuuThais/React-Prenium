import React from "react";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="#">
        <img
          src="/images/mask-group-8.png"
          alt="Icon 1"
          className="sidebar-icon"
        />
      </Link>
      <Link to="/indexUser">
        <img
          src="/images/mask-group-8-2.png"
          alt="Icon 2"
          className="sidebar-icon"
        />
      </Link>
      <Link to="#">
        <img
          src="/images/accout.png"
          alt="Icon 3"
          className="sidebar-icon"

        />
      </Link>
      <Link to="#">
        <img src="/images/setting.png" alt="Icon 3" className="sidebar-icon" />
      </Link>
    </div>
  );
}
