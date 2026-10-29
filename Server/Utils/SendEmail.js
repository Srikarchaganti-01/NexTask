const transporter = require("../Config/Email");

async function sendEmail(to, subject, html) {
  try {
    return await transporter.sendMail({
      from: `"NexTask" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email delivery failed:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
