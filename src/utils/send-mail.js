const transporter = require('../configs/mail');

const sendMail = (from, to, subject, text, html, filename, path) => {
    const message = {
        from,
        to,
        subject,
        text,
        html,
        attachments: [{
            filename,
            path: './src/utils/content.txt'
        }]
    };

    transporter.sendMail(message);
}

const sendMailToAdmins = (from, subject, text, html, filename, path) => {
    const message = {
        from,
        to: ["a@a.com", "b@b.com", "c@c.com", "d@d.com", "e@e.com"],
        subject,
        text,
        html,
        attachments: [{
            filename,
            path: './src/utils/content.txt'
        }]
    };

    transporter.sendMail(message);
}


module.exports = {
    sendMail,
    sendMailToAdmins
}

