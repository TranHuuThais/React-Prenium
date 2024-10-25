import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../inc/siderbar";

export default function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    civilite: "",
    nom: "",
    prenom: "",
    maison: "",
    groupeDroits: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/users/${userId}`
        );
        setUserInput(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Error fetching user data.");
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = { ...userInput };
      if (!userInput.password) {
        delete updatedUser.password;
      }
      const response = await axios.put(
        `http://localhost:8001/api/users/${userId}`,
        updatedUser
      );
      alert("User updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(
        "Error updating user: " +
          (error.response?.data?.message || "Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h1>Edit User</h1>
        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        <form className="create-user-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInput.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (leave blank to keep current)"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="civilite"
            placeholder="Civilité"
            value={userInput.civilite}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={userInput.nom}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={userInput.prenom}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="maison"
            placeholder="Maison"
            value={userInput.maison}
            onChange={handleChange}
            required
            className="input-field"
          />
          <select
            name="groupeDroits"
            value={userInput.groupeDroits}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="" disabled>
              Select Groupe de Droits
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>
        <button onClick={() => navigate(-1)} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}
