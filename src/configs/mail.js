const nodeMailer = require('nodemailer');
require('dotenv').config();

module.exports = 

nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 
      process.env.NODE_ENV == 'development' ?
       process.env.MAILER_DEVELOPER_ACCESS_USER : process.env.MAILER_SERVER_ACCESS_USER,
    pass: 
      process.env.NODE_ENV == 'development' ?
       process.env.MAILER_DEVELOPER_ACCESS_KEY : process.env.MAILER_SERVER_ACCESS_KEY,
  },
});