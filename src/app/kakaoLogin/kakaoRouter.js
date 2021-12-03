const bodyParser = require('body-parser');
const jwtMiddleware = require("../../../config/jwtMiddleware");
const  kakaoLoginDao  = require('../kakaoLogin/kakaoLoginDao');
const axios = require('axios');
const res = require("express");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

module.exports= async function (app) {


    const passport = require('passport')
    const KakaoStrategy = require('passport-kakao').Strategy


    passport.use('kakao-login', new KakaoStrategy({
        clientID: '225d1620ffad66a40efe1143310d0458',
        callbackURL: 'http://localhost:3000/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
        //console.log(profile._json.email);
        // //console.log({where: { email: profile._json.email , provider: 'kakao'}});
        // console.log(profile._json.kakao_account.email);
        // const email = profile._json.kakao_account.email;
        // const exUser = await kakaoLoginDao.findOne(email);
        // console.log(exUser);

        return (done(accessToken));

    }));

    app.get('/kakao', passport.authenticate('kakao-login'));

    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect('/');
    });


    app.get('/kakao/login', async (req, res) => {
        let user;
        try {
            const kakaoToken = req.query.kakaoToken;
            user = await axios({
                method: 'get',
                url: 'https://kapi.kakao.com/v2/user/me',
                headers: {
                    Authorization: `Bearer ${kakaoToken}`
                }
            })

            const email = user.data.kakao_account.email;
            console.log(email+'token');

            const exUser = await kakaoLoginDao.getEmail(email);
            console.log(exUser);
            console.log('hi');
            if(!exUser) return res.json({
                isSuccess:false,
                code:2031,
                message:'회원가입이 되어있지 않습니다.'
            })

            let token = await jwt.sign(
                {
                    userId: exUser[0].userId,
                }, // 토큰의 내용(payload)
                secret_config.jwtsecret, // 비밀키
                {
                    expiresIn: "365d",
                    subject: "userInfo",
                } // 유효 기간 365일
            );
        return res.json({
            isSuccess:true,
            code:1000,
            result:{
                jwt: token,
                userId:exUser[0].userId
            }
        })

        } catch (e) {
            res.json(e.data);
        }



    })



}