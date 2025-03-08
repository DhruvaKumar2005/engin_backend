const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database"); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: "https://engin-git-main-mohammed-absals-projects.vercel.app/pages/getstarted.html", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
