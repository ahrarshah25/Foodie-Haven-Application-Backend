import nodemailer from "nodemailer";

export default async function approveRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { userEmail, userName } = req.body;

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
      to: process.env.EMAIL,
      subject: "📋 New Vendor Request - Foodie Haven",
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
            .header { background: linear-gradient(135deg, #FFD700 0%, #E6C200 100%); padding: 40px 30px; text-align: center; }
            .logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 15px; }
            .logo-icon { font-size: 2.2rem; }
            .logo-text { font-family: 'Georgia', serif; font-size: 26px; font-weight: bold; color: #222; }
            .title { font-size: 24px; font-weight: 600; color: #222; margin-bottom: 8px; }
            .subtitle { font-size: 16px; color: rgba(34,34,34,0.8); font-weight: 500; }
            .content { padding: 30px; }
            .alert-badge { background: #FF6B35; color: white; padding: 6px 16px; border-radius: 4px; font-size: 13px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .info-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #FFD700; }
            .info-row { display: flex; margin-bottom: 12px; }
            .info-label { min-width: 100px; font-weight: 600; color: #555; }
            .info-value { color: #222; font-weight: 500; }
            .message-box { background: #FFF9E6; border-radius: 8px; padding: 18px; margin: 25px 0; border: 1px dashed #FFD700; font-style: italic; color: #666; }
            .cta-button { display: inline-block; background: #FFD700; color: #222; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px; transition: all 0.3s ease; margin-top: 15px; }
            .cta-button:hover { background: #E6C200; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3); }
            .footer { background: #222; color: white; padding: 25px; text-align: center; font-size: 13px; }
            .footer-text { color: rgba(255,255,255,0.7); margin-bottom: 10px; }
            .admin-link { color: #FFD700; text-decoration: none; font-weight: 600; }
            @media (max-width: 600px) { 
                .header, .content { padding: 25px 20px; } 
                .title { font-size: 20px; } 
                .info-row { flex-direction: column; } 
                .info-label { margin-bottom: 4px; } 
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="header">
                <div class="logo">
                    <span class="logo-icon">🍴</span>
                    <span class="logo-text">Foodie Haven</span>
                </div>
                <h1 class="title">New Vendor Application</h1>
                <p class="subtitle">Action Required: Review & Approval Needed</p>
            </div>
            
            <div class="content">
                <div class="alert-badge">📋 Pending Approval</div>
                
                <p style="margin-bottom: 20px; color: #555;">Hello Admin,</p>
                
                <p style="margin-bottom: 20px; color: #555;">A new vendor has requested to join <strong>Foodie Haven</strong>. Please review their details and approve/reject the application.</p>
                
                <div class="info-box">
                    <div class="info-row">
                        <div class="info-label">Vendor Name:</div>
                        <div class="info-value">${userName}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Email Address:</div>
                        <div class="info-value">${userEmail}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Requested Date:</div>
                        <div class="info-value">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Application Time:</div>
                        <div class="info-value">${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                </div>
                
                <div class="message-box">
                    New vendor <strong>${userName}</strong> has applied for admin approval. Please review and take appropriate action.
                </div>
                
                <div style="margin: 25px 0;">
                    <a href="${process.env.ADMIN_DASHBOARD_URL}" class="cta-button">
                        👉 Go to Foodie Haven Admin Panel
                    </a>
                </div>
                
                <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin-top: 25px; border: 1px solid #d0e7ff;">
                    <p style="color: #2c5282; font-weight: 600; margin-bottom: 8px;">💡 Quick Reminder:</p>
                    <p style="color: #4a5568; font-size: 14px;">Please process this vendor request within <strong>24-48 hours</strong> for best user experience.</p>
                </div>
            </div>
            
            <div class="footer">
                <p class="footer-text">This is an automated notification from Foodie Haven Admin System</p>
                <p class="footer-text">
                    Manage vendors: 
                    <a href="${process.env.ADMIN_DASHBOARD_URL}" class="admin-link">Admin Dashboard</a>
                </p>
                <p class="footer-text" style="margin-top: 15px; font-size: 12px;">
                    © ${new Date().getFullYear()} Foodie Haven. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `,
    });

    await transpoter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: "✅ Vendor Application Received - Foodie Haven",
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
            .header { background: linear-gradient(135deg, #FFD700 0%, #E6C200 100%); padding: 40px 30px; text-align: center; }
            .logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 15px; }
            .logo-icon { font-size: 2.2rem; }
            .logo-text { font-family: 'Georgia', serif; font-size: 26px; font-weight: bold; color: #222; }
            .title { font-size: 24px; font-weight: 600; color: #222; margin-bottom: 8px; }
            .subtitle { font-size: 16px; color: rgba(34,34,34,0.8); font-weight: 500; }
            .content { padding: 30px; }
            .success-badge { background: #00D26A; color: white; padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .info-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #FFD700; }
            .info-row { display: flex; margin-bottom: 12px; }
            .info-label { min-width: 100px; font-weight: 600; color: #555; }
            .info-value { color: #222; font-weight: 500; }
            .status-timeline { margin: 25px 0; padding: 20px; background: #FFF9E6; border-radius: 8px; border: 1px solid #FFD700; }
            .timeline-step { display: flex; align-items: center; margin-bottom: 15px; }
            .timeline-step:last-child { margin-bottom: 0; }
            .step-icon { width: 32px; height: 32px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #222; font-weight: bold; margin-right: 15px; }
            .step-icon.active { background: #00D26A; color: white; }
            .step-details { flex: 1; }
            .step-title { font-weight: 600; color: #222; margin-bottom: 4px; }
            .step-desc { color: #666; font-size: 14px; }
            .cta-button { display: inline-block; background: #FFD700; color: #222; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px; transition: all 0.3s ease; margin-top: 15px; }
            .cta-button:hover { background: #E6C200; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3); }
            .footer { background: #222; color: white; padding: 25px; text-align: center; font-size: 13px; }
            .footer-text { color: rgba(255,255,255,0.7); margin-bottom: 10px; }
            .contact-info { display: flex; justify-content: center; gap: 20px; margin-top: 15px; flex-wrap: wrap; }
            .contact-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.9); }
            @media (max-width: 600px) { 
                .header, .content { padding: 25px 20px; } 
                .title { font-size: 20px; } 
                .info-row { flex-direction: column; } 
                .info-label { margin-bottom: 4px; } 
                .contact-info { flex-direction: column; gap: 10px; } 
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="header">
                <div class="logo">
                    <span class="logo-icon">🍴</span>
                    <span class="logo-text">Foodie Haven</span>
                </div>
                <h1 class="title">Application Received!</h1>
                <p class="subtitle">Thank you for choosing Foodie Haven</p>
            </div>
            
            <div class="content">
                <div class="success-badge">✅ Request Successfully Sent</div>
                
                <p style="margin-bottom: 20px; color: #555;">Hello <strong>${userName}</strong>,</p>
                
                <p style="margin-bottom: 20px; color: #555;">We've successfully received your vendor application for <strong>Foodie Haven</strong>. Our admin team will review your request shortly.</p>
                
                <div class="info-box">
                    <div class="info-row">
                        <div class="info-label">Your Name:</div>
                        <div class="info-value">${userName}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Email Address:</div>
                        <div class="info-value">${userEmail}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Application ID:</div>
                        <div class="info-value">FH-VENDOR-${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Submission Date:</div>
                        <div class="info-value">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                    </div>
                </div>
                
                <div class="status-timeline">
                    <h3 style="margin-bottom: 20px; color: #222; font-size: 16px;">📋 Application Status Timeline:</h3>
                    
                    <div class="timeline-step">
                        <div class="step-icon active">1</div>
                        <div class="step-details">
                            <div class="step-title">Application Submitted</div>
                            <div class="step-desc">Your request has been received successfully</div>
                        </div>
                    </div>
                    
                    <div class="timeline-step">
                        <div class="step-icon">2</div>
                        <div class="step-details">
                            <div class="step-title">Under Review</div>
                            <div class="step-desc">Our team is reviewing your application</div>
                        </div>
                    </div>
                    
                    <div class="timeline-step">
                        <div class="step-icon">3</div>
                        <div class="step-details">
                            <div class="step-title">Verification</div>
                            <div class="step-desc">We'll verify your details and documents</div>
                        </div>
                    </div>
                    
                    <div class="timeline-step">
                        <div class="step-icon">4</div>
                        <div class="step-details">
                            <div class="step-title">Approval Decision</div>
                            <div class="step-desc">You'll receive our decision via email</div>
                        </div>
                    </div>
                </div>
                
                
                <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin-top: 25px; border: 1px solid #d0e7ff;">
                    <p style="color: #2c5282; font-weight: 600; margin-bottom: 8px;">⏰ What's Next?</p>
                    <p style="color: #4a5568; font-size: 14px; margin-bottom: 8px;">• You'll receive an update within <strong>24-48 hours</strong></p>
                    <p style="color: #4a5568; font-size: 14px; margin-bottom: 8px;">• Check your email regularly for status updates</p>
                    <p style="color: #4a5568; font-size: 14px;">• We may contact you if we need additional information</p>
                </div>
            </div>
            
            <div class="footer">
                <p class="footer-text">Thank you for your interest in becoming a Foodie Haven vendor!</p>
                <p class="footer-text">We're excited to potentially work with you.</p>
                
                
                <p class="footer-text" style="margin-top: 20px; font-size: 12px;">
                    © ${new Date().getFullYear()} Foodie Haven. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: "Error: " + error.message });
  }
}
