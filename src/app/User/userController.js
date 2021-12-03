const jwtMiddleware = require("../../../config/jwtMiddleware");
const userService = require("../../app/User/userService");
const userProvider = require("../../app/User/userProvider");
const userDao = require("../../app/User/userDao");
const {smtpTransport} = require('../../../config/email');
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const { pool } = require("../../../config/database");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const {logger} = require("../../../config/winston");
exports.signUp = async function (req, res) {
    const connection = await pool.getConnection(async(conn) => conn);
    const {email, password, nickname} = req.body;


    if(!email) return res.send(errResponse((baseResponse.SIGNUP_EMAIL_EMPTY)));
    if(!password) return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));


    //if(!verifyNum) return res.send(response(baseResponse.SIGNUP_CERIFINUM_ERROR));


    if(!nickname) return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    //패스워드 체크 if(passwordCheck != password) return res.send(response(baseResponse.SIGNUP_PASSWORD_CHECK));

   //  const verifyNumDatabase = await userDao.getVerifyNum(connection, verifyNum);
   // // console.log(verifyNumDatabase);
   //
   //
   //  if(!verifyNumDatabase.length ) {
   //
   //      return res.send(errResponse(baseResponse.VERIFY_NUM_INVALID));
   //  }
   //  else {await userDao.deleteNum(verifyNum);}


    const signUpResponse = await userService.createUser(
        email, password, nickname
    )
    connection.release();

    return res.send(signUpResponse);
}

exports.login = async function (req, res) {
    //console.log("1");
    const email = req.body.email;

    const password = req.body.password;

    if(!email) return res.send(errResponse((baseResponse.SIGNUP_EMAIL_EMPTY)));
    if(!password) return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

    const signInResponse = await userService.postSignIn(email, password);



    if(typeof(signInResponse) !=="string") return res.send(signInResponse);

    return res.send(signInResponse);
}


exports.checkEmail = async function (req, res) {
    try {
        const email = req.query.email;
        if(!email)
            return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

        if (email.length > 30)
            return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

        if (!regexEmail.test(email))
            return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

        const emailRows = await userProvider.emailCheck(email);
        // console.log(email);
        // console.log(emailRows);

        if (emailRows.length > 0)
            return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));


        return res.json({"isSuccess": true, "code": 1000, "message": "성공"});
    }catch (err){
        logger.error(`App - checkEmail Service error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.DB_ERROR));
    }
}

exports.checkCertifiNum = async function(req, res) {
    try {
        const verifyNum = req.body.verifyNum;

        if (!verifyNum) return res.send(response(baseResponse.SIGNUP_CERIFINUM_ERROR));

        const connection = await pool.getConnection(async (conn) => conn);
        const verifyNumDatabase = await userDao.getVerifyNum(connection, verifyNum);
        // console.log(verifyNumDatabase);


        if (!verifyNumDatabase.length) {
            return res.send(errResponse(baseResponse.VERIFY_NUM_INVALID));
        } else {
            await userDao.deleteNum(verifyNum);
        }

        return res.send(response(baseResponse.SUCCESS));
    }catch (err) {
        logger.error(`App - CheckCertifyNumber Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.checkNickname = async function(req, res) {
    try{
        const nickname = req.query.nickname;
        if(!nickname) return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

        const connection = await pool.getConnection(async(conn)=>conn);
        const emailCheckDatabase = await userDao.selectByNickname(connection, nickname);
        //console.log(emailCheckDatabase);
        console.log(emailCheckDatabase[0].length);
        if (emailCheckDatabase[0].length > 0)
            return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_CHECK));
        return res.send(response(baseResponse.SUCCESS));


    }catch (err) {
        logger.error(`App - CheckNicknameRedundancy Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
exports.getmyPage = async function(req, res) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const userIdFromJWT = req.verifiedToken.userId
        if(!userIdFromJWT) return res.send(response(baseResponse.JWT_IS_EMPTY))
        const userId = req.params.userId;
        if(userIdFromJWT != userId) return res.send(response(baseResponse.USER_ID_NOT_MATCH));
        const getCoupon = await userDao.selectCoupon(connection, userId);
        if (getCoupon.length ==0 )
             res.send(errResponse(baseResponse.COUPON_IS_EMPTY));
        const getOrder = await userDao.selectOrder(connection, userId);

        const getInfo = await userDao.selectInfo(connection, userId);
        const getEvent = await userDao.selectEvent(connection);
        return res.json({
            isSuccess: true,
            code: 1000,
            result: {
                couponInfo: getCoupon[0],
                event: getEvent[0],
                orderInfo: getOrder[0],
                Info: getInfo[0]
            }
        })


    }catch (err) {
        logger.error(`App - myShopping Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postReview = async function(req, res){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const userIdFromJWT = req.verifiedToken.userId
        if(!userIdFromJWT) return res.send(response(baseResponse.JWT_IS_EMPTY))
        const userId = req.params.userId;
        const productId = req.params.productId;
        const {durability, price, design, delivery, reviewImgUrl, reviewText} = req.body;
        if(!durability) return res.send(response(baseResponse.REVIEW_DURABILITY_EMPTY));
        if(!price) return res.send(response(baseResponse.REVIEW_PRICE_EMPTY));
        if(!design) return res.send(response(baseResponse.REVIEW_DESIGN_EMPTY));
        if(!delivery) return res.send(response(baseResponse.REVIEW_IMG_EMPTY));
        if(!reviewText) return res.send(response(baseResponse.REVIEW_TEXT_EMPTY));


        if(userIdFromJWT != userId) return res.send(response(baseResponse.USER_ID_NOT_MATCH));
        const postReview = await userDao.postReviewQ(connection, durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId);

        return res.send(response(baseResponse.SUCCESS));



    }catch (err) {
        logger.error(`App - postReview Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
exports.patchReview = async function (req, res) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const userIdFromJWT = req.verifiedToken.userId
        if(!userIdFromJWT) return res.send(response(baseResponse.JWT_IS_EMPTY))
        const userId = req.params.userId;
        const productId = req.params.productId;
        const {durability, price, design, delivery, reviewImgUrl, reviewText} = req.body;
        if(!durability) return res.send(response(baseResponse.REVIEW_DURABILITY_EMPTY));
        if(!price) return res.send(response(baseResponse.REVIEW_PRICE_EMPTY));
        if(!design) return res.send(response(baseResponse.REVIEW_DESIGN_EMPTY));
        if(!delivery) return res.send(response(baseResponse.REVIEW_IMG_EMPTY));
        if(!reviewText) return res.send(response(baseResponse.REVIEW_TEXT_EMPTY));

        const editReview = await userDao.updateReviewText(connection, durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId);


        connection.release();
        return res.send(response(baseResponse.SUCCESS));



    }catch (err) {
        logger.error(`App - patchReview Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteReview = async function(req, res) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const userIdFromJWT = req.verifiedToken.userId
        if(!userIdFromJWT) return res.send(response(baseResponse.JWT_IS_EMPTY))
        const userId = req.params.userId;
        const productId = req.params.productId;
        if(!userId) return res.send(response(baseResponse.USERID_EMPTY));
        if(!productId) return res.send(response(baseResponse.PRODUCT_ID_EMPTY));

        const deleteResult = await userDao.deleteReview(connection, userId, productId);
        connection.release();
        return res.send(response(baseResponse.SUCCESS));



    }catch (err) {
        logger.error(`App - patchReview Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}