const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const productDao = require("./productDao");



exports.getProdInfo = async function(prodId){
    const connection = await pool.getConnection(async (conn) => conn);
    const prodResult = await productDao.selectProdId(connection, prodId);

    connection.release();

    return prodResult[0];
};

exports.prodinfo = async function(prodId){
    const connection = await pool.getConnection((async(conn) => conn));
    const prodInfoImg = await productDao.selectInfoImg(connection, prodId);
    connection.release();

    return prodInfoImg[0];
}

exports.prodReview = async function(prodId) {
    const connection = await pool.getConnection((async(conn)=>conn));

    const totalStarRating = await productDao.selectStarRating(connection, prodId);

    connection.release();

    return totalStarRating[0];

}

exports.prodReviewInfo = async function(prodId) {
    const connection = await pool.getConnection((async(conn)=> conn));

    const totalReview = await productDao.selectReview(connection,prodId);

    connection.release();

    return totalReview[0];
}
exports.prodRecommend = async function(prodId) {
    const connection = await pool.getConnection((async(conn)=> conn));
    const getCategoryId = await productDao.selectCategoryId(connection, prodId);

    const categoryId = getCategoryId[0][0].categoryId;


    const totalRecommend = await productDao.selectRecommend(connection,categoryId, prodId);

    return totalRecommend[0];
}

exports.productOptionlist = async function(productId){
    const connection = await pool.getConnection(async (conn) => conn);

    const getoptionlistName = await productDao.selectOptionlistId(connection, productId);
    var optionlistId = new Array();
    for( var i =0;i<3;i++){
       // console.log(typeof(getoptionlistName[0][i].optionlistId));
        //console.log(typeof(getoptionlistName[0][i]));
        if(getoptionlistName[0][i] == undefined) break;
        optionlistId[i] =getoptionlistName[0][i].optionlistId;
    }
  //  console.log(optionlistId);
    var optionlistAll = new Array();

    for(var i=0;i<3;i++) {
        if(optionlistId[i] == null) break;
        const getOptionlist = await productDao.selectOptionlist(connection, optionlistId[i]);
        optionlistAll[i] = getOptionlist[0];
    }

    connection.release();
    //console.log(optionlistAll);

    return optionlistAll;
}