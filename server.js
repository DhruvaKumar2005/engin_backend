const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", // Allow all origins (for debugging)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - Body:`, JSON.stringify(req.body));
    res.setHeader("Access-Control-Expose-Headers", "*");  // Ensure logs are visible in the browser
    next();
});

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    console.log("Server is running...");
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
