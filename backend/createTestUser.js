const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    const User = mongoose.model("User", userSchema);


    const testUser = new User({
      email: "testuser@example.com",
      password: "password123", 
    });

   
    testUser
      .save()
      .then(() => {
        console.log("Test user created successfully.");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error creating test user:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
