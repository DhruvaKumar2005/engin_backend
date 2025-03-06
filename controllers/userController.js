const pool = require("../config/database");
const sendConfirmationEmail = require("../services/emailService");

const registerUser = async (req, res) => {
    const { fullName, email, role, location, insights } = req.body;

    if (!fullName || !email || !role || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO users (full_name, email, role, location, insights) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [fullName, email, role, location, insights || null]
        );

        await sendConfirmationEmail(email, fullName);

        res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { registerUser };