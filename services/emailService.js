const { sendEmail } = require("../config/emailConfig");

async function sendConfirmationEmail(email, fullName) {
    try {
        const subject = "Welcome to Engin - Your Journey Starts Here";
        
        const text = `Hi ${fullName},

Thank you for joining Engin – the platform where ideas meet teams, mentors, and investors to turn dreams into reality.

You're now part of a movement that empowers creators like you to innovate, collaborate, and succeed. Together, we're building a future where no idea is too big or too small to thrive.

Stay tuned for updates, and get ready to:
✨ Collaborate with the best minds, mentors, investors
🚀 Accelerate your idea with the right resources
🌍 Make an impact that matters

We're thrilled to have you on board. The journey to turning your idea into reality starts soon!

With excitement,

The Engin Team`;

        const html = `<div>
            <p>Hi ${fullName},</p>
            <p>Thank you for joining Engin – the platform where ideas meet teams, mentors, and investors to turn dreams into reality.</p>
            <p>You're now part of a movement that empowers creators like you to innovate, collaborate, and succeed. Together, we're building a future where no idea is too big or too small to thrive.</p>
            <p>Stay tuned for updates, and get ready to:</p>
            <ul>
                <li>✨ Collaborate with the best minds, mentors, investors</li>
                <li>🚀 Accelerate your idea with the right resources</li>
                <li>🌍 Make an impact that matters</li>
            </ul>
            <p>We're thrilled to have you on board. The journey to turning your idea into reality starts soon!</p>
            <p>With excitement,</p>
            <p>The Engin Team</p>
        </div>`;

        const result = await sendEmail(email, subject, text, html);
        
        if (result.success) {
            console.log(`Confirmation email sent to ${email} with ID: ${result.id}`);
        } else {
            console.error("Error sending email:", result.error);
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendConfirmationEmail;