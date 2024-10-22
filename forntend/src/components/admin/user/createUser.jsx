import React, { useState } from "react";

export default function CreateUser() {
  const [userInput, setUserInput] = useState({
    email: "",
    nom: "",
    prenom: "",
    maison: "",
    groupeDroits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", userInput);
    setUserInput({
      email: "",
      nom: "",
      prenom: "",
      maison: "",
      groupeDroits: "",
    });
  };

  return (
    <div className="create-user-container">
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
        <input
          type="text"
          name="groupeDroits"
          placeholder="Groupe de Droits"
          value={userInput.groupeDroits}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Add User</button>
      </form>
    </div>
  );
}
