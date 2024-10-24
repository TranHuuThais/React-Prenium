import React from "react";
import Sidebar from "../inc/siderbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import FormTable from "../Table/FormTable";
export default function indexUser() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content flex-grow p-4">
        <div className="text-container">
          <div className="left-text">
            <div className="text-heading">RÉGLAGES ET UTILISATEURS</div>
            <Link to="/dashboard" className="mini-heading">
              ACCUEIL
            </Link>
          </div>
          <div className="right-text flex flex-col items-end">
            <Link to="/createUser" className="icon-button mb-2">
              <FontAwesomeIcon icon={faInfoCircle} size="lg" /> NOUVEL
              UTILISATEUR
            </Link>
            <button className="icon-button">
              <FontAwesomeIcon icon={faCog} size="lg" /> GESTION DES DROITS
            </button>
          </div>
        </div>
        <FormTable />
      </div>
    </div>
  );
}
