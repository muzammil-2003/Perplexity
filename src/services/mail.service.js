import nodemailer from 'nodemailer'

let transporter;

export const initMailer = async () => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.GOOGLE_USER,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        }
    })

    try {
        await transporter.verify();
        console.log("Server is ready to send emails");
    } catch (err) {
        console.error("Email verification failed:", err);
        throw err;
    }
};

export const sendVerificationEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${to}`);
    }
    catch (error) {
        console.error(`Error sending verification email to ${to}:`, error);
        throw error;
    }
}