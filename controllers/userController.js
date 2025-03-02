const { pool } = require("../config/database");

const registerUser = async (req, res) => {
    const { full_name, email, role, location } = req.body;

    if (!full_name || !email || !role || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO users (full_name, email, role, location) VALUES ($1, $2, $3, $4) RETURNING *",
            [full_name, email, role, location]
        );
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser };
