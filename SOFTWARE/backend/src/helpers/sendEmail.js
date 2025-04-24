const nodemailer = require("nodemailer")

const sendEmail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    }
  });

  const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: html
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
}

module.exports = sendEmail