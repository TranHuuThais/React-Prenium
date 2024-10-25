const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, password, civilite, nom, prenom, maison, groupeDroits } =
    req.body;

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
      groupeDroits,
      derniereConnexion: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "Người dùng đã được đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ.", error: error.message });
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
      return res
        .status(200)
        .json({ message: "Đăng nhập thành công!", userId: user._id });
    } else {
      return res.status(401).json({ message: "Mật khẩu không hợp lệ." });
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});
// Delete user by ID
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.status(200).json({ message: "Người dùng đã được xóa thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});
// Retrieve user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.json(user);
  } catch (error) {
    console.error("Lỗi khi tìm người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});

// Edit user by ID
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("Đang cố gắng cập nhật người dùng với ID:", id);

  const { email, password, civilite, nom, prenom, maison, groupeDroits } =
    req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // Update user fields only if provided
    user.email = email || user.email;
    user.civilite = civilite || user.civilite;
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.maison = maison || user.maison;
    user.groupeDroits = groupeDroits || user.groupeDroits;

    // Hash password only if a new password is provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Người dùng đã được cập nhật thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
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

router.post("/users/searchUser", async (req, res) => {
  const { nom } = req.query;

  try {
    const users = await User.find({ nom: new RegExp(nom, "i") });

    if (users.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
});

module.exports = router;
