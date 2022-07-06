const nodemailer = require("nodemailer");

async function sendMail(subject, html, text) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "service@toptechonly.com", // generated ethereal user
                pass: "service{TopTechOnly}%125", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: "service@toptechonly.com", // sender address
            to: "compassion@toptechonly.com", // list of receivers
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
        console.error(error.message);
    }
}
sendMail('test',"hello",'')