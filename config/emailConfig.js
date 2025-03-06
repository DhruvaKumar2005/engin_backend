const { Resend } = require('resend');
require('dotenv').config();


const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (to, subject, text, html) => {
  try {
    const data = await resend.emails.send({
      from: 'Engin <onboarding@resend.dev>',
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