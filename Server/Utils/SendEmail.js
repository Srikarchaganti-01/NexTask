const transporter = require("../Config/Email");

async function sendEmail(to, subject, html) {
  return await transporter.sendMail({
    from: `"NexTask" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
