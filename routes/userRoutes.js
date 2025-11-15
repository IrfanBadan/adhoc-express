import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));


// 📝 Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
