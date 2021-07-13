const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'upeulegajo@gmail.com',
        pass: '12345pingon'
    },

});
module.exports = transporter;