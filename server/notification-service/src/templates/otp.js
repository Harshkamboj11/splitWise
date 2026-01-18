const otpTemplate = ({name, otp}) => {
    const html =    
        `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your SplitWise Verification Code</title>
  </head>

  <body style="margin:0; padding:0; background:#070a0f; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <!-- Container -->
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#0b1220; margin-top:56px; border-radius:16px; overflow:hidden; border:1px solid rgba(34,197,94,0.18);">

            <!-- Header -->
            <tr>
              <td style="padding:28px 36px; background:#020617;">
                <h1 style="margin:0; font-size:20px; color:#22c55e; letter-spacing:0.4px;">
                  SplitWise
                </h1>
                <p style="margin:6px 0 0; font-size:13px; color:#94a3b8;">
                  Secure account verification
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 36px; color:#e5e7eb;">

                <p style="margin-top:0; font-size:15px; color:#cbd5e1;">
                  Hi <strong>${name}</strong>,
                </p>

                <p style="font-size:15px; line-height:1.7; color:#cbd5e1;">
                  We received a request to verify your email address for your
                  <strong>SplitWise</strong> account.
                </p>

                <!-- OTP Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                  <tr>
                    <td align="center">
                      <div
                        style="display:inline-block; padding:18px 28px;
                               background:#020617;
                               border:1px solid rgba(34,197,94,0.35);
                               border-radius:12px;
                               font-size:28px;
                               letter-spacing:6px;
                               font-weight:700;
                               color:#22c55e;">
                        ${otp}
                      </div>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#9ca3af; text-align:center;">
                  This code will expire in <strong>5 minutes</strong>.
                </p>

                <div style="height:1px; background:rgba(148,163,184,0.15); margin:32px 0;"></div>

                <p style="font-size:13px; color:#94a3b8; line-height:1.6;">
                  If you didn’t request this code, please ignore this email.
                  Your account remains secure.
                </p>

                <p style="margin-top:28px; font-size:14px;">
                  — <strong style="color:#22c55e;">SplitWise Security Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px; background:#020617; text-align:center;">
                <p style="margin:0; font-size:12px; color:#64748b;">
                  © 2026 SplitWise · Security you can trust
                </p>
              </td>
            </tr>

          </table>

          <div style="height:48px;"></div>

        </td>
      </tr>
    </table>
  </body>
</html>
`
    
    return html
}

export default otpTemplate