const resend = require("../Config/Email");

async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: "NexTask <onboarding@nextask.space>",
      to: [to],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data.id);
    return data;
  } catch (error) {
    console.error("Email delivery failed:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
