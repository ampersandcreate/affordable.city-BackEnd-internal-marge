const nodemailer = require('nodemailer');
module.exports = {
    sendmail: function(data, res) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: '',
                pass: ''
            },
            secureConnection: false
        });

        const mailOptions = {
            from: 'Affordable City',
            to: data.email,
            subject: data.subject,
            html: data.html
        };


        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}