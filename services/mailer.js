import nodemailer from "nodemailer"

function sendEmail(emailInputs) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.gmail_email,
            pass: process.env.gmail_password,
        },
    });

    // Create an email message
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender's email address
        to: emailInputs.email, // Recipient's email address
        subject: emailInputs.sub,
        text: emailInputs.text,
        html: emailInputs.html,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
export default sendEmail