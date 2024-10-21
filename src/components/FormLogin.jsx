import React, { useState } from "react";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="text-field">SE CONNECTER</div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label className="text">E-mail</label>
          <input
            type="email"
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text">Mot de passe:</label>
          <input
            type="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">SE CONNECTER</button>
      </form>
    </div>
  );
};

export default FormLogin;
