// server/services/emailService.js
// Placeholder transport: logs emails to the console until a provider (SendGrid, SES, etc.) is configured.

const sendEmail = async ({ to, subject, text }) => {
  console.log(`[email] To: ${to}\n[email] Subject: ${subject}\n[email] ${text}`);
};

const sendPasswordResetRequest = (user) =>
  sendEmail({
    to: user.email,
    subject: 'Reset your Beyond The Bar password',
    text: `Hi ${user.name}, we received a request to reset your password.`,
  });

module.exports = { sendEmail, sendPasswordResetRequest };
