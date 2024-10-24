import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FormTable() {
  const [users, setUsers] = useState([]);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.civilite}</td>
              <td className="border px-4 py-2">{user.nom}</td>
              <td className="border px-4 py-2">{user.prenom}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.maison}</td>
              <td className="border px-4 py-2">{user.groupeDroits}</td>
              <td className="border px-4 py-2">
                {user.derniereConnexion
                  ? user.derniereConnexion.toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
