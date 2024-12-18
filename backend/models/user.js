const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  civilite: String,
  nom: String,
  prenom: String,
  maison: String,
  groupeDroits: String,
  derniereConnexion: { type: Date, default: Date.now },});

module.exports = mongoose.model("User", userSchema);
