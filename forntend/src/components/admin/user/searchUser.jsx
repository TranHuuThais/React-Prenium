import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../inc/siderbar";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("nom");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.post(
        `${apiUrl}users/searchUser?nom=${query}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="form-table-container mt-4">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Civilité</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Prénom</th>
              <th className="border px-4 py-2">Adresse mail</th>
              <th className="border px-4 py-2">Maison</th>
              <th className="border px-4 py-2">Groupe de droits</th>
              <th className="border px-4 py-2">Dernière connexion</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.civilite}</td>
                  <td className="border px-4 py-2">{user.nom}</td>
                  <td className="border px-4 py-2">{user.prenom}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.maison}</td>
                  <td className="border px-4 py-2">{user.groupeDroits}</td>
                  <td className="border px-4 py-2">
                    {new Date(user.derniereConnexion).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">
                  Không tìm thấy người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchUser;
