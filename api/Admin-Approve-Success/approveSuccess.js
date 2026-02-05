import nodemailer from "nodemailer";

export default async function approveSuccess(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { email, userName } = req.body;

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
    subject: "🎉 Congratulations! Your Vendor Request Has Been Approved - Foodie Haven",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333; line-height: 1.6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
            .email-wrapper { max-width: 600px; width: 100%; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
            .header { background: linear-gradient(135deg, #FFD700 0%, #E6C200 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden; }
            .confetti { position: absolute; width: 15px; height: 15px; background: rgba(255,255,255,0.7); border-radius: 50%; animation: confetti 5s linear infinite; }
            .confetti:nth-child(1) { left: 10%; animation-delay: 0s; }
            .confetti:nth-child(2) { left: 30%; animation-delay: 1s; }
            .confetti:nth-child(3) { left: 50%; animation-delay: 2s; }
            .confetti:nth-child(4) { left: 70%; animation-delay: 3s; }
            .confetti:nth-child(5) { left: 90%; animation-delay: 4s; }
            @keyframes confetti {
                0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
            }
            .logo { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px; }
            .logo-icon { font-size: 3rem; animation: bounce 2s infinite; }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .logo-text { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: bold; color: #222; }
            .title { font-size: 36px; font-weight: 800; color: #222; margin-bottom: 10px; background: linear-gradient(45deg, #222, #444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .subtitle { font-size: 18px; color: rgba(34,34,34,0.9); font-weight: 500; }
            .content { padding: 40px; }
            .approved-badge { background: linear-gradient(135deg, #00D26A, #00B894); color: white; padding: 12px 30px; border-radius: 50px; font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 10px; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0, 210, 106, 0.3); }
            .greeting { font-size: 20px; color: #444; margin-bottom: 25px; line-height: 1.8; }
            .greeting strong { color: #222; font-weight: 700; }
            .card { background: #f8f9fa; border-radius: 15px; padding: 25px; margin: 25px 0; border: 2px dashed #00D26A; position: relative; }
            .card-icon { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: #00D26A; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 5px 15px rgba(0, 210, 106, 0.4); }
            .info-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
            .info-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
            .info-item:last-child { border-bottom: none; }
            .info-label { font-weight: 600; color: #666; }
            .info-value { font-weight: 700; color: #222; }
            .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
            .feature { text-align: center; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease; }
            .feature:hover { transform: translateY(-5px); }
            .feature-icon { font-size: 2rem; color: #FFD700; margin-bottom: 15px; }
            .feature-title { font-weight: 700; color: #222; margin-bottom: 8px; }
            .feature-desc { color: #666; font-size: 14px; }
            .cta-section { text-align: center; margin: 40px 0; }
            .cta-button { display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #FFD700, #E6C200); color: #222; padding: 18px 45px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 18px; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4); }
            .cta-button:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6); }
            .footer { background: #1a1a2e; color: white; padding: 30px; text-align: center; }
            .welcome-text { font-size: 22px; color: #FFD700; font-weight: 700; margin-bottom: 15px; }
            .next-steps { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin: 20px 0; }
            .step { display: flex; align-items: center; margin-bottom: 15px; }
            .step:last-child { margin-bottom: 0; }
            .step-number { background: #FFD700; color: #222; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
            .step-text { flex: 1; text-align: left; }
            .contact-info { display: flex; justify-content: center; gap: 25px; margin-top: 25px; flex-wrap: wrap; }
            .contact-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.9); }
            .contact-item a { color: #FFD700; text-decoration: none; }
            @media (max-width: 600px) { 
                .content { padding: 25px; } 
                .title { font-size: 28px; } 
                .features { grid-template-columns: 1fr; } 
                .contact-info { flex-direction: column; gap: 15px; } 
                .cta-button { width: 100%; justify-content: center; }
                .header { padding: 40px 20px; }
            }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="email-wrapper">
            <div class="header">
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="logo">
                    <span class="logo-icon">🎉</span>
                    <span class="logo-text">Foodie Haven</span>
                </div>
                <h1 class="title">Request Approved Successfully!</h1>
                <p class="subtitle">Welcome to the Foodie Haven Vendor Family</p>
            </div>
            
            <div class="content">
                <div class="approved-badge">
                    <span>✅</span>
                    <span>APPROVED</span>
                </div>
                
                <div class="greeting">
                    Congratulations <strong>${userName}</strong>! 🎊<br><br>
                    We're thrilled to inform you that your vendor application has been <strong>successfully approved</strong> by our admin team. Welcome to Foodie Haven's premium vendor network!
                </div>
                
                <div class="card">
                    <div class="card-icon">📋</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Vendor Name:</div>
                            <div class="info-value">${userName}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Status:</div>
                            <div class="info-value" style="color: #00D26A;">✅ ACTIVE VENDOR</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Approval Date:</div>
                            <div class="info-value">${new Date().toLocaleDateString('en-PK', { 
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Vendor ID:</div>
                            <div class="info-value">VEND-${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}</div>
                        </div>
                    </div>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🏪</div>
                        <div class="feature-title">Create Your Shop</div>
                        <div class="feature-desc">Set up your digital storefront with custom branding</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📦</div>
                        <div class="feature-title">Upload Products</div>
                        <div class="feature-desc">Add food items with images, prices & categories</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">💰</div>
                        <div class="feature-title">Start Earning</div>
                        <div class="feature-desc">Receive orders and grow your business</div>
                    </div>
                </div>
                
                <div class="cta-section">
                    <a href="https://foodie-haven.vercel.app/login" class="cta-button">
                        <span>🚀 Login Now & Get Started</span>
                        <span>→</span>
                    </a>
                    <p style="color: #666; margin-top: 15px; font-size: 14px;">Click the button above to access your vendor dashboard</p>
                </div>
            </div>
            
            <div class="footer">
                <div class="welcome-text">Welcome Aboard! 🎊</div>
                
                <div class="next-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-text">
                            <strong>Login to your account</strong><br>
                            <small>Use your credentials to access vendor dashboard</small>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-text">
                            <strong>Set up your shop profile</strong><br>
                            <small>Add shop name, description, and branding</small>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-text">
                            <strong>Add your products</strong><br>
                            <small>Start uploading food items to sell</small>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-text">
                            <strong>Start receiving orders</strong><br>
                            <small>Get ready to grow your business</small>
                        </div>
                    </div>
                </div>
                
                <div style="margin: 25px 0; font-size: 15px; color: rgba(255,255,255,0.8);">
                    Need help getting started? Check out our <a href="https://foodie-haven.vercel.app/vendor-guide" style="color: #FFD700; text-decoration: underline;">Vendor Guide</a> or contact our support team.
                </div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <span>📧</span>
                        <a href="mailto:vendor.ahrar.0932@gmail.com">vendor.support@foodiehaven.com</a>
                    </div>
                    <div class="contact-item">
                        <span>🌐</span>
                        <a href="https://foodie-haven.vercel.app">foodie-haven.vercel.app</a>
                    </div>
                    <div class="contact-item">
                        <span>📞</span>
                        <span>+92 331 2044136</span>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p style="color: rgba(255,255,255,0.6); font-size: 12px;">
                        © ${new Date().getFullYear()} Foodie Haven. All rights reserved.<br>
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
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
