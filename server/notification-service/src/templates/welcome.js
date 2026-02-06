const welcomeUser = ({ name }) => {
  const html = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to SplitWise</title>
  </head>

  <body style="margin:0; padding:0; background:#070a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <!-- Outer Container -->
          <table width="620" cellpadding="0" cellspacing="0"
            style="background:#0b1220; margin-top:56px; border-radius:16px; overflow:hidden; border:1px solid rgba(34,197,94,0.15);">

            <!-- Brand Header -->
            <tr>
              <td style="padding:32px 36px; background:#020617;">
                <h1 style="margin:0; font-size:22px; color:#22c55e; letter-spacing:0.4px;">
                  SplitWise
                </h1>
                <p style="margin:6px 0 0; font-size:13px; color:#94a3b8;">
                  Expense sharing, done right
                </p>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding:40px 36px; color:#e5e7eb;">

                <p style="margin-top:0; font-size:16px;">
                  Hi <strong style="color:#22c55e;">${name}</strong>,
                </p>

                <p style="font-size:15px; line-height:1.7; color:#cbd5e1;">
                  Your SplitWise account has been successfully created.
                  You can now manage shared expenses clearly, fairly, and without awkward follow-ups.
                </p>

                <!-- Divider -->
                <div style="height:1px; background:rgba(148,163,184,0.15); margin:28px 0;"></div>

                <!-- Features -->
                <p style="margin:0 0 12px; font-size:14px; color:#22c55e; font-weight:600;">
                  What you can do with SplitWise
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:14px 0; font-size:14px; color:#d1d5db;">
                      ✔ Split expenses with individuals or groups
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; font-size:14px; color:#d1d5db;">
                      ✔ Track balances and settlements in real-time
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; font-size:14px; color:#d1d5db;">
                      ✔ Stay in control of your money, stress-free
                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <div style="margin-top:36px;">
                  <a href="#"
                    style="display:inline-block; padding:12px 22px; background:#22c55e; color:#020617;
                           text-decoration:none; font-size:14px; font-weight:600; border-radius:8px;">
                    Open SplitWise
                  </a>
                </div>

                <!-- Security Note -->
                <p style="margin-top:32px; font-size:13px; color:#94a3b8; line-height:1.6;">
                  If you didn’t create this account, you can safely ignore this email.
                  No further action is required.
                </p>

                <p style="margin-top:28px; font-size:14px;">
                  — <strong style="color:#22c55e;">SplitWise Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px; background:#020617; text-align:center;">
                <p style="margin:0; font-size:12px; color:#64748b;">
                  © 2026 SplitWise · Built for clarity & fairness
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

`;

  return html;
};

export default welcomeUser;
