import userModel from "../models/user.model.js"
import catchAsync from "../utils/catchAsync.js"
import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "../services/mail.service.js"

export const register = catchAsync(async (req, res) => {
    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'User with this email or username already exists',
            success: false,
            err: 'User already exists'
        })
    }

    const user = await userModel.create({ username, email, password })

    const emailVerificationToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
  
  <table width="100%" style="padding:40px 0;">
    <tr>
      <td align="center">
        
        <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:30px; text-align:center; color:#fff;">
              <h1 style="margin:0; font-size:26px;">Welcome to Perplexity 🚀</h1>
              <p style="margin:10px 0 0; font-size:14px; opacity:0.9;">
                You're officially in!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px;">
              
              <h2 style="margin-top:0;">Hi ${user.username},</h2>

              <p style="font-size:16px; line-height:1.6; color:#444;">
                We're excited to have you onboard. Your account is ready, and you can start exploring right away.
              </p>

              <!-- CTA -->
              <div style="text-align:center; margin:30px 0;">
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"
                   style="background:#4f46e5; color:#fff; padding:14px 28px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

              <!-- Features Section -->
              <h3 style="margin-bottom:15px;">What you can do:</h3>

              <table width="100%" style="font-size:14px; color:#555;">
                <tr>
                  <td style="padding:8px 0;">✅ Create and manage your profile</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">⚡ Explore powerful features</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">🔒 Secure and reliable platform</td>
                </tr>
              </table>

              <!-- Tip Box -->
              <div style="background:#f9fafb; padding:15px; border-radius:6px; margin-top:25px;">
                <p style="margin:0; font-size:13px; color:#666;">
                  💡 <strong>Tip:</strong> Complete your profile to unlock the full experience.
                </p>
              </div>

              <p style="margin-top:30px; font-size:14px; color:#666;">
                If you have any questions, just reply to this email—we’re here to help.
              </p>

              <p style="margin-top:20px;">
                Cheers,<br>
                <strong>Team Perplexity</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} Perplexity<br/>
              <span style="font-size:11px;">Built with ❤️ for users</span>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

    await sendVerificationEmail({
        to: email,
        subject: 'Welcome to Perplexity',
        html: htmlTemplate
    })

    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })

})

export const verifyEmail = catchAsync(async (req, res) => {
    const { token } = req.query

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({ email: decode.email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid token.",
            success: false
        })
    }

    if (user.verified) {
        return res.send(`
                <h1>Already Verified</h1>
                <p>Your email is already verified.</p>
            `);
    }

    user.verified = true
    await user.save()

    res.send(`
        <h1>Email verified successfully</h1>
        <p>Your email has now been verified. Now, you can login to your account.</p>
    `)
})