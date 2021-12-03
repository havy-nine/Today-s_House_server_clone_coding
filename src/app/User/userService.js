const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const res = require("express");
const {json} = require("express");



exports.createUser = async function(email, password, nickname)  { try {
    // 이메일 중복 확인
    // const emailRows = await userProvider.emailCheck(email);
    // console.log(emailRows.length);
    // console.log(emailRows);
    // if (emailRows.length == 0)
    // {console.log(emailRows.length);
    //     return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
    // }

    // 비밀번호 암호화
    const hashedPassword =  await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");

    const insertUserInfoParams = [email, hashedPassword, nickname];

    const connection = await pool.getConnection(async (conn) => conn);

    const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
    console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
    connection.release();

    return response(baseResponse.SUCCESS);


} catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
}
};

exports.postSignIn = async function(email, password) {
    try {
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].email
        //console.log(password);
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const LoginInfo = [selectEmail, hashedPassword];

        const passwordRows = await userProvider.passwordCheck(LoginInfo);

        //console.log(passwordRows);
        //console.log(passwordRows[0]);
        if(passwordRows[0] == undefined) {
            return errResponse(
                baseResponse.SIGNIN_PASSWORD_WRONG);
            }else { var pw = passwordRows[0].password;}
     //   console.log(hashedPassword);
      //  console.log(pw);



        // if (pw !== hashedPassword) {
        //
        //     // console.log(hashedPassword);
        //     return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        //     }


        const userInfoRows = await userProvider.accountCheck(email)





        let token = await jwt.sign(
            {
                userId: userInfoRows[0].userId,
            },
            secret_config.jwtsecret,
            {
                expiresIn: "365d",
                subject: "userId",
            }
        );


        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].userId, 'jwt': token});


    }catch (err) {
            logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
            return errResponse(baseResponse.DB_ERROR);

    }
}