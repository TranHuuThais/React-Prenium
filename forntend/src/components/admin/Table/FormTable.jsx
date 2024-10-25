import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditUser from "../user/editUser";

export default function FormTable() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);
    try {
      const response = await axios.delete(
        `http://localhost:8001/api/users/${userId}`
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  };

  const openEditUserModal = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  return (
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
            <th className="border px-4 py-2">actes</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.civilite}</td>
              <td className="border px-4 py-2">{user.nom}</td>
              <td className="border px-4 py-2">{user.prenom}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.maison}</td>
              <td className="border px-4 py-2">{user.groupeDroits}</td>
              <td className="border px-4 py-2">{user.derniereConnexion}</td>
              <td className="border px-2 py-2">
                <button
                  onClick={() => openEditUserModal(user._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  réparer
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                >
                  effacer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
