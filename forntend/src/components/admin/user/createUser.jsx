import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../inc/siderbar";

export default function CreateUser() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    civilite: "",
    nom: "",
    prenom: "",
    maison: "",
    groupeDroits: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.password || !userInput.nom) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });

      const result = await response.json();
      console.log("Result:", result);

      if (response.ok) {
        console.log("User created:", result);
        navigate("/dashboard");
      } else {
        console.error("Error creating user:", result.message);
        alert(result.message || "An error occurred while creating the user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the user.");
    }

    setUserInput({
      email: "",
      password: "",
      civilite: "",
      nom: "",
      prenom: "",
      maison: "",
      groupeDroits: "",
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h1>User Add</h1>
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
            placeholder="Password"
            value={userInput.password}
            onChange={handleChange}
            required
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

          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
