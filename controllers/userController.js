const pool = require("../config/database");
const sendConfirmationEmail = require("../services/emailService");

const registerUser = async (req, res, next) => {
    console.log("Registration attempt with data:", JSON.stringify(req.body));
    
    const { fullName, email, role, location, insights } = req.body;

    if (!fullName || !email || !role || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        console.log("Checking if user exists:", email);
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            console.log("User already exists:", email);
            return res.status(409).json({ error: "User already registered!" }); // 409 Conflict
        }

        console.log("Inserting new user:", email);
        // Insert new user
        const result = await pool.query(
            "INSERT INTO users (full_name, email, role, location, insights) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [fullName, email, role, location, insights || null]
        );
        
        console.log("User inserted successfully:", result.rows[0].id);

        // Try to send email but don't let it block registration
        try {
            console.log("Attempting to send confirmation email to:", email);
            await sendConfirmationEmail(email, fullName);
            console.log("Email sent successfully to:", email);
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Continue despite email failure
        }

        console.log("Registration complete for:", email);
        return res.status(201).json({ 
            message: "User registered successfully!", 
            user: result.rows[0] 
        });
    } catch (error) {
        console.error("Database error during registration:", error);
        // Pass the error to the global error handler
        return next(error);
    }
};

module.exports = { registerUser };