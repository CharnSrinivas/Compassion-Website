const nodemailer = require("nodemailer");
console.log(process.env.FROM_EMAIL);
async function sendMail(subject,html,text) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.FROM_EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: process.env.FROM_EMAIL, // sender address
            to: process.env.TO_EMAIL, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {

    }
}
sendMail()