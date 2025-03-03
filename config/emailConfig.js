const { Resend } = require('resend');
require('dotenv').config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    
    console.log('✅ Email sent successfully:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
};

module.exports = { sendEmail };