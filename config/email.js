const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: 'Naver',
    secure: false,
    auth: {
        user: 'havy1@naver.com',
        pass: 'process.env.NODEMAILER_PASS',
    },
});

module.exports={
    smtpTransport
}