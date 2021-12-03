
const {pool} = require("../../../config/database");
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserQuery = 'insert into user(email, password, nickname) values(?,?,?);';

    const insertUserRow = await connection.query(insertUserQuery, insertUserInfoParams);
    return insertUserRow;
}


async function addverifyNum(connection, num){
    const insertVerifyQuery = ' insert into verifyNum(verifyNum) values(?);';

    const insertVerifyRow = await connection.query(insertVerifyQuery, num);

    return insertVerifyRow;
}
async function getVerifyNum(connection,verifyNum){

    const getNumQuery = 'select verifyNum as \'인증번호\' from verifyNum where verifyNum = ?;';

    const [getNumRow] = await connection.query(getNumQuery, verifyNum);

    //console.log(getNumRow);
    return getNumRow;

}

async function deleteNum(verifyNum){
    const connection = await pool.getConnection(async(conn)=> conn);
    const deleteVNum = 'delete from verifyNum where verifyNum = ?;';
    await connection.query(deleteVNum, verifyNum);

}
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = 'SELECT email, nickname ' +
        '                FROM user   ' +
        '          WHERE email = ?;';

    const [emailRows] = await connection.query(selectUserEmailQuery, email);

    return emailRows;
}

async function selectUserPassword(connection, LoginInfo) {
    const selectUserPasswordQuery = 'SELECT email, nickname, password' +
        '        FROM user' +
        '        WHERE email = ? AND password = ?;';
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        LoginInfo
    );

    return selectUserPasswordRow;
}
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = '        SELECT userId    ' +
        '    FROM user ' +
        '       WHERE email = ?;';
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}
async function selectByNickname(connection, nickname){

    const selectNicknameQuery = ' SELECT nickname ' +
        ' FROM user ' +
        'where nickname = ?;';

    const selectNicknameRows = await connection.query(
        selectNicknameQuery, nickname
    );
    return selectNicknameRows;
}

async function selectCoupon(connection, userId) {
    const selectCouponQuery = 'select count(couponId) as \'쿠폰\', point, class from user\n' +
        'left join coupon c on user.userId = c.userId where user.userId = ?;';
    const selectCouponRow = await connection.query(selectCouponQuery, userId);

    return selectCouponRow[0];
}

async function selectOrder(connection, userId) {
    const selectOrderQuery = '\n' +
        'select count(if(status=\'입금대기\', status, null)) as 입금대기, count(if(status=\'결제완료\', status, null)) as 결제완료, count(if(status=\'배송준비\', status, null)) as 배송준비,\n' +
        '       count(if(status=\'배송중\', status, null)) as 배송중, count(if(status=\'배송완료\', status, null)) as 배송완료, count(if(status=\'리뷰쓰기\', status, null)) as 리뷰쓰기 from orderPage where userId = ?;'
    const selectOrderRow = await connection.query(selectOrderQuery, userId);

    return selectOrderRow[0];
}
async function selectInfo(connection, userId) {
    const selectInfo = 'select scrapNum, questionNum, reviewNum from user where userId = ?;'
    const selectInfoRow = await connection.query(selectInfo, userId);

    return selectInfoRow[0];
}
async function selectEvent(connection){
    const selectEventQuery = 'select eventImg from event ORDER BY eventImg desc limit 1'
    const selectEventRow = await connection.query(selectEventQuery);

    return selectEventRow[0]
}

async function postReviewQ(connection, durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId){
    const postReviewQuery = 'INSERT INTO review(durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId)\n' +
        '        VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

    const postReviewRow = await connection.query(postReviewQuery, [durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId]);

    return postReviewRow[0];
}

async function updateReviewText(connection, durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId){
    const editReviewQuery = 'UPDATE review\n' +
        '          SET durability = ?, price=?, design=?, delivery=? ,reviewImgUrl= ?, reviewText= ?\n' +
        '          WHERE userId = ? and productId = ?;';
    const editReviewRow = await connection.query(editReviewQuery,[durability, price, design, delivery, reviewImgUrl, reviewText, userId, productId]);

    return editReviewRow[0];
}

async function deleteReview(connection, userId, productId){
    const deleteReviewQuery = 'delete from review where userId=? and productId=?'

    const deleteReviewRow = await connection.query(deleteReviewQuery, [userId, productId]);

    return deleteReviewRow;

}
module.exports = {
    insertUserInfo,
    addverifyNum,
    getVerifyNum,
    deleteNum,
    selectUserPassword,
    selectUserAccount,
    selectUserEmail,
    selectByNickname,
    selectOrder,
    selectCoupon,
    selectInfo,
    selectEvent,
    postReviewQ,
    updateReviewText,
    deleteReview
}