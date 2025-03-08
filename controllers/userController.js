const pool = require("../config/database");
const sendConfirmationEmail = require("../services/emailService");

const registerUser = async (req, res) => {
    const { fullName, email, role, location, insights } = req.body;

    if (!fullName || !email || !role || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: "User already registered!" }); // 409 Conflict
        }

        // Insert new user
        const result = await pool.query(
            "INSERT INTO users (full_name, email, role, location, insights) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [fullName, email, role, location, insights || null]
        );

        // Send confirmation email
        await sendConfirmationEmail(email, fullName);

        res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { registerUser };
