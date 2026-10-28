function verificationEmail(verificationLink) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify your NexTask account</title>
      </head>

      <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="background-color:#f4f4f5;padding:40px 16px;">
          <tr>
            <td align="center">

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="max-width:520px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td style="padding:26px 32px;border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:24px;font-weight:800;letter-spacing:-1px;color:#18181b;">
                      NexTask
                    </span>
                    <p style="margin:6px 0 0;font-size:12px;color:#71717a;">
                      TASK MANAGEMENT, SIMPLIFIED
                    </p>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding:36px 32px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#71717a;">
                      ACCOUNT VERIFICATION
                    </p>

                    <h1 style="margin:0 0 16px;font-size:28px;line-height:1.3;letter-spacing:-0.8px;color:#18181b;">
                      Welcome to NexTask.
                    </h1>

                    <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#52525b;">
                      You're one step away from getting started. Confirm your
                      email address to activate your account and start managing
                      your tasks with NexTask.
                    </p>

                    <!-- CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius:9px;background-color:#18181b;">
                          <a href="${verificationLink}"
                            target="_blank"
                            style="display:inline-block;padding:15px 24px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:9px;">
                            Verify email address &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Expiry notice -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                      style="margin-top:28px;background-color:#fafafa;border:1px solid #e4e4e7;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;font-size:13px;line-height:1.7;color:#52525b;">
                          <strong style="color:#18181b;">Security notice</strong><br />
                          This verification link expires in 15 minutes.
                          If you didn't create this account, you can safely
                          ignore this email.
                        </td>
                      </tr>
                    </table>

                    <!-- Fallback link -->
                    <p style="margin:28px 0 8px;font-size:12px;line-height:1.7;color:#71717a;">
                      If the button doesn't work, copy and paste this URL into
                      your browser:
                    </p>

                    <a href="${verificationLink}"
                      style="font-size:12px;line-height:1.8;color:#3f3f46;word-break:break-all;">
                      ${verificationLink}
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:22px 32px;background-color:#fafafa;border-top:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:12px;color:#71717a;">
                      Thank you for choosing NexTask.
                    </p>
                    <p style="margin:8px 0 0;font-size:11px;line-height:1.7;color:#a1a1aa;">
                      &copy; 2026 NexTask. All rights reserved.
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#a1a1aa;">
                      This is an automated email. Please do not reply.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

module.exports = verificationEmail;
