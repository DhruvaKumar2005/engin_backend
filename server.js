const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
