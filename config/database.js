const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api", userRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await pool.connect();
        console.log(`✅ Server running on port ${PORT}`);
    } catch (err) {
        console.error("❌ Database Connection Error:", err);
    }
});
