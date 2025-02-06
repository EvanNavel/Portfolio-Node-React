const nodemailer = require('nodemailer');

// Create a transporter object using Zoho's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // SSL port
  secure: true, // SSL/TLS
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (name, email, message) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: 'mechapoltergeist333@gmail.com',
      subject: `New message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    });
    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
