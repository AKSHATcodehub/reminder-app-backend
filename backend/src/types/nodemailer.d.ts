import nodemailer from 'nodemailer';

// Example of sending an email using nodemailer
const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, SendGrid)
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
