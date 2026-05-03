import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

/* ── MongoDB Connection ── */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sainz_shop")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ── User Schema ── */
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:     { type: String, default: "" },
  password:  { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* ── JWT helper ── */
const JWT_SECRET = process.env.JWT_SECRET || "sainz55_secret_key_change_in_production";
const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

/* ── Auth middleware ── */
const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ success: false, message: "Token tidak valid" });
  }
};

/* ── Order Schema (for TUTAM: Create, Read, Delete) ── */
const orderSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items:    [{
    productId: String,
    name:      String,
    size:      String,
    price:     Number,
    qty:       Number,
  }],
  total:    { type: Number, required: true },
  status:   { type: String, default: "pending", enum: ["pending", "paid", "cancelled"] },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

/* ────────────────────────────────────────────
   ROUTES
──────────────────────────────────────────── */

/* Health check */
app.get("/", (req, res) => res.json({ message: "Sainz Shop API is running 🏎️" }));

/* ── Register ── */
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password minimal 8 karakter" });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      const field = exists.email === email.toLowerCase() ? "Email" : "Username";
      return res.status(409).json({ success: false, message: `${field} sudah terdaftar` });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, email, phone: phone || "", password: hashed });
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Silakan login.",
      data: { user: { id: user._id, name: user.name, username: user.username, email: user.email } },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── Login ── */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }
    const token = signToken(user._id);
    res.json({
      success: true,
      message: "Login berhasil!",
      data: {
        token,
        user: { id: user._id, name: user.name, username: user.username, email: user.email, phone: user.phone },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── Get current user ── */
app.get("/api/auth/me", protect, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

/* ── CREATE Order ── */
app.post("/api/orders", protect, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart kosong" });
    }
    const order = await Order.create({ user: req.user._id, items, total, status: "paid" });
    res.status(201).json({ success: true, message: "Order berhasil dibuat!", data: { order } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── READ Orders (by user) ── */
app.get("/api/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: { orders } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── READ single Order ── */
app.get("/api/orders/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    res.json({ success: true, data: { order } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── DELETE Order ── */
app.delete("/api/orders/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    res.json({ success: true, message: "Order dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ── Start server ── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
