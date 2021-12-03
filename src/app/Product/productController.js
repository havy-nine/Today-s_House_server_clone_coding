const jwtMiddleware = require("../../../config/jwtMiddleware");
const productProvider = require('../../app/Product/productProvider');
const productService = require('../../app/Product/productService');
const productDao = require('../../app/Product/productDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require("../../../config/response");
const {pool} = require("../../../config/database");


exports.getProd = async function (req, res) {

    prodId = req.params.productId;

    if(!prodId) return res.send(errResponse(baseResponse.PRODUCT_ID_EMPTY));





   const getProd = await productProvider.getProdInfo(prodId);
   //console.log(getProd);
    if(getProd.length<1) return res.send(errResponse(baseResponse.PRODUCT_IS_NOT_EXIST));

   const getinfo = await productProvider.prodinfo(prodId);

   //if(getinfo.length<1) return res.send(errResponse(baseResponse.PRODUCT_INFO_IMG_IS_NOT_EXIST));
   const getStar = await productProvider.prodReview(prodId);
   //if(getStar.length<1) return res.send(errResponse(baseResponse.PRODUCT_STAR_IS_NOT_EXIST));
   const getReview = await productProvider.prodReviewInfo(prodId);
   //if(getReview.length<1) return res.send(errResponse((baseResponse.PRODUCT_REVIEW_IS_NOT_EXIST)));
   const getRecommend = await productProvider.prodRecommend(prodId);






    return res.json({
        isSuccess: true,
        code: 1000,
        message: "성공",
        result: {productDetailPage: getProd[0],
        productInfo: getinfo,
        starRating: getStar[0],
        review: getReview,
        recommend: getRecommend}
    });

}


exports.getOptionlist = async function(req, res) {
    productId = req.params.productId;

    if(!productId) return res.send(errResponse(baseResponse.PRODUCT_ID_EMPTY));

    const getProductOption = await productProvider.productOptionlist(productId);
    const connection = await pool.getConnection(async (conn) => conn);

    const getOption = await productDao.selectOption(connection, productId);
    connection.release();
    if(getProductOption.length<1) return res.send(errResponse(baseResponse.PRODUCT_OPTIONLIST_IS_NOT_EXIST));
    console.log(getProductOption[2]);
    return res.json({
        isSuccess: true,
        code: 1000,
        message: "성공",
        result: {
            optionlist: getOption[0],
            option : getProductOption[0]
        },


    });
}