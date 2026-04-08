const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const ExpenseModel = require("./models/Expense");
require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err.message));

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

    // ── Auth Middleware ──────────────────────────────────────────
    const auth = (req, res, next) => {
        const header = req.headers.authorization;
        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch {
            return res.status(401).json({ message: "Invalid token" });
        }
    };

// ── Signup ───────────────────────────────────────────────────
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await new User({ username, email, password: hashedPass }).save();

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ── Login ────────────────────────────────────────────────────
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ── Expenses ─────────────────────────────────────────────────
app.post("/expense", auth, async (req, res) => {
    try {
        const { amount, category, date, note } = req.body;
        const expense = await new ExpenseModel({
            amount, category, date, note, userId: req.userId
        }).save();
        res.status(201).json({ message: "Expense created successfully", expense });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/expenselist", auth, async (req, res) => {
    try {
        const data = await ExpenseModel.find({ userId: req.userId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));