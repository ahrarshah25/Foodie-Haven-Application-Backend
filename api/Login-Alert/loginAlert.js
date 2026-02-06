import nodemailer from "nodemailer";

export default async function loginAlert(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { email } = req.body;

  const userAgent = req.headers["user-agent"] || "Unknown";

  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "Unknown";

  const browser =
    userAgent.includes("Chrome") ? "Google Chrome" :
    userAgent.includes("Firefox") ? "Mozilla Firefox" :
    userAgent.includes("Edg") ? "Microsoft Edge" :
    userAgent.includes("Safari") ? "Apple Safari" :
    "Unknown Browser";

  const os =
    userAgent.includes("Windows") ? "Windows" :
    userAgent.includes("Mac") ? "macOS" :
    userAgent.includes("Linux") ? "Linux" :
    userAgent.includes("Android") ? "Android" :
    userAgent.includes("iPhone") ? "iOS" :
    "Unknown OS";

  try {
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transpoter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "🔐 New Login Detected - Foodie Haven",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', sans-serif; background: #f8f9fa; color: #333; line-height: 1.6; }
            .email-wrapper { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
            .logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 15px; }
            .logo-icon { font-size: 2.2rem; }
            .logo-text { font-family: 'Georgia', serif; font-size: 26px; font-weight: bold; color: white; }
            .title { font-size: 24px; font-weight: 600; color: white; margin-bottom: 8px; }
            .subtitle { font-size: 16px; color: rgba(255,255,255,0.8); font-weight: 500; }
            .content { padding: 30px; }
            .alert-badge { background: #FF6B35; color: white; padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .security-box { background: #fff5f5; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #fed7d7; }
            .info-row { display: flex; margin-bottom: 12px; }
            .info-label { min-width: 120px; font-weight: 600; color: #555; }
            .info-value { color: #222; font-weight: 500; }
            .device-details { background: #f8f9fa; border-radius: 8px; padding: 18px; margin: 25px 0; border-left: 4px solid #4a5568; }
            .warning-box { background: #FFF9E6; border-radius: 8px; padding: 20px; margin: 25px 0; border: 2px solid #FFD700; }
            .warning-title { color: #d69e2e; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
            .cta-button { display: inline-block; background: #2d3748; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; transition: all 0.3s ease; margin-top: 15px; border: none; cursor: pointer; }
            .cta-button:hover { background: #4a5568; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(45, 55, 72, 0.3); }
            .footer { background: #1a1a2e; color: white; padding: 25px; text-align: center; font-size: 13px; }
            .footer-text { color: rgba(255,255,255,0.7); margin-bottom: 10px; }
            .security-tips { margin: 25px 0; padding: 20px; background: #e6fffa; border-radius: 8px; border: 1px solid #81e6d9; }
            .tip-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
            .tip-icon { color: #00d26a; margin-right: 10px; font-weight: bold; }
            @media (max-width: 600px) { 
                .header, .content { padding: 25px 20px; } 
                .title { font-size: 20px; } 
                .info-row { flex-direction: column; } 
                .info-label { margin-bottom: 4px; } 
                .cta-button { width: 100%; text-align: center; } 
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="header">
                <div class="logo">
                    <span class="logo-icon">🔒</span>
                    <span class="logo-text">Foodie Haven Security</span>
                </div>
                <h1 class="title">New Login Detected</h1>
                <p class="subtitle">Security Alert for Your Account</p>
            </div>
            
            <div class="content">
                <div class="alert-badge">⚠️ SECURITY NOTIFICATION</div>
                
                <p style="margin-bottom: 20px; color: #555;">Hello,</p>
                
                <p style="margin-bottom: 20px; color: #555;">We detected a new login to your Foodie Haven account. If this was you, no action is needed. If you don't recognize this activity, please secure your account immediately.</p>
                
                <div class="security-box">
                    <h3 style="color: #c53030; margin-bottom: 15px; font-size: 18px;">🔍 Login Details:</h3>
                    <div class="info-row">
                        <div class="info-label">Account:</div>
                        <div class="info-value">${email}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Time:</div>
                        <div class="info-value">${new Date().toLocaleString('en-PK', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                        })}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">IP Address:</div>
                        <div class="info-value">${ipAddress || 'Unknown'}</div>
                    </div>
                </div>
                
                <div class="device-details">
                    <h3 style="color: #2d3748; margin-bottom: 15px; font-size: 16px;">📱 Device & Browser Information:</h3>
                    <div class="info-row">
                        <div class="info-label">Browser:</div>
                        <div class="info-value">${browser || 'Unknown Browser'}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Operating System:</div>
                        <div class="info-value">${os || 'Unknown OS'}</div>
                    </div>
                </div>
                
                <div class="warning-box">
                    <div class="warning-title">
                        <span>⚠️</span>
                        <span>Don't Recognize This Login?</span>
                    </div>
                    <p style="color: #744210; margin-bottom: 15px;">If you didn't perform this login, someone else may have accessed your account. We recommend taking immediate action to secure your account.</p>
                    
                    <a href="https://foodie-haven-application.vercel.app/forgot-password" class="cta-button">
                        🔐 Reset Your Password Now
                    </a>
                </div>
                
                <div class="security-tips">
                    <h3 style="color: #234e52; margin-bottom: 15px; font-size: 16px;">🛡️ Security Tips:</h3>
                    <div class="tip-item">
                        <div class="tip-icon">✓</div>
                        <div>Use a strong, unique password for Foodie Haven</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon">✓</div>
                        <div>Enable two-factor authentication if available</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon">✓</div>
                        <div>Never share your login credentials</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-icon">✓</div>
                        <div>Log out from shared devices</div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #ebf8ff; border-radius: 8px; border: 1px solid #90cdf4;">
                    <p style="color: #2c5282; margin-bottom: 10px; font-weight: 600;">ℹ️ Important Note:</p>
                    <p style="color: #4a5568; font-size: 14px;">For security reasons, we recommend regularly updating your password and reviewing your account activity.</p>
                </div>
            </div>
            
            <div class="footer">
                <p class="footer-text">This is an automated security alert from Foodie Haven</p>
                <p class="footer-text">If you have any concerns about your account security, please contact our support team immediately.</p>
                <p class="footer-text" style="margin-top: 15px;">
                    📧 <a href="mailto:ahrar.0932@gmail.com" style="color: #FFD700; text-decoration: none;">security@foodiehaven.com</a> | 
                    🌐 <a href="https://foodie-haven-application.vercel.app/help" style="color: #FFD700; text-decoration: none;">Help Center</a>
                </p>
                <p class="footer-text" style="margin-top: 20px; font-size: 12px;">
                    © ${new Date().getFullYear()} Foodie Haven. All rights reserved.<br>
                    This email was sent to ${email}
                </p>
            </div>
        </div>
    </body>
    </html>
    `
});

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message })
  }
}
