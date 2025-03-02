const transporter = require("../config/emailConfig");

async function sendConfirmationEmail(email, fullName) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Engin - Your Journey Starts Here",
            text: `Hi ${fullName},\n\nThank you for joining Engin – the platform where ideas meet teams, mentors, and investors to turn dreams into reality.\n\nYou’re now part of a movement that empowers creators like you to innovate, collaborate, and succeed. Together, we’re building a future where no idea is too big or too small to thrive.\n\nStay tuned for updates, and get ready to:✨ Collaborate with the best minds, mentors, investors🚀 Accelerate your idea with the right resources.🌍 Make an impact that matters.\n\nWe’re thrilled to have you on board. The journey to turning your idea into reality starts soon!\n\nWith excitement,\n\nThe Engin Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendConfirmationEmail;
