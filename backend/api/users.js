const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, password, civilite, nom, prenom, maison, groupeDroits } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Người dùng đã tồn tại." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      civilite, 
      nom, 
      prenom, 
      maison, 
      groupeDroits 
    });

    await newUser.save();
    res.status(201).json({ message: "Người dùng đã được đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message); 
    res.status(500).json({ message: "Lỗi máy chủ nội bộ.", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email không hợp lệ." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({ message: "Đăng nhập thành công!", userId: user._id });
    } else {
      return res.status(401).json({ message: "Mật khẩu không hợp lệ." });
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});

// Get users list
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});

module.exports = router;
