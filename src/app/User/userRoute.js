const response = require("../../../config/baseResponseStatus");
const userDao = require('./userDao');
const {pool} = require("../../../config/database");
const nodemailer = require('nodemailer');
const smtpTransport = require("../../../config/email");
const user = require('./userController');
const jwtMiddleware = require('../../../config/jwtMiddleware');

module.exports = function(app) {
    app.post('/mail', async (req, res) => {
        const connection = await pool.getConnection(async(conn) => conn);

        const generateRandom = function (min, max) {
            const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
            return ranNum;
        }
        const num = generateRandom(111111,999999);

         await userDao.addverifyNum(connection, num);


        const smtpTransport = nodemailer.createTransport({
            service: 'Naver',
            auth: {
                user: 'havy1@Naver.com',
                pass: 'ljs418..'
            }
        })
        if(!req.body.email) return res.send(response.FAIL_EMAIL_SEND);
        const mailOptions = {
            from: 'havy1@naver.com',
            to: req.body.email,
            subject: '오늘의 집 인증 번호',
            text: '인증번호는 '+num + '입니다'
        };

        await smtpTransport.sendMail(mailOptions, (error, responses) => {
            if (error) {
                res.send(response.FAIL_EMAIL_SEND);
            } else {
                console.log("success")
            }
            smtpTransport.close();
        });



        return res.send(response.SUCCESS);
    });

    app.post("/users/sign-up",user.signUp);

    app.post('/users/login', user.login);

    app.get('/users/email-overlap',user.checkEmail);

    app.post('/users/Certification-number',user.checkCertifiNum);

    app.get('/users/nickname-overlap',user.checkNickname);

    app.get('/users/:userId/myShopping',jwtMiddleware, user.getmyPage);

    app.post('/users/:userId/prods/:productId/review', jwtMiddleware, user.postReview);

    app.patch('/users/:userId/prods/:productId/reviewText', jwtMiddleware, user.patchReview);

    app.delete('/users/:userId/prods/:productId/review', jwtMiddleware, user.deleteReview);
}