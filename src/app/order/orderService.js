const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const orderProvider = require("./orderProvider");
const orderDao = require("./orderDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");






exports.orderProd = async function (userId){
    try{
    const connection = await pool.getConnection(async (conn)=> conn);
    const getDeliveryPlace = await orderDao.selectDeliveryPlace(connection, userId);


    return getDeliveryPlace[0]
    }catch (err) {
        logger.error(`App - orderDelivery Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.orderP = async function(userId){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const getOrderPerson = await orderDao.selectOrderPerson(connection, userId);

        return getOrderPerson[0]
    }catch (err) {
        logger.error(`App - orderPerson Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.orderProduct = async function(productId){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);


        const getProduct = await orderDao.selectProduct(connection, productId);


        return getProduct[0]
    }catch (err) {
        logger.error(`App - ordeProduct Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
exports.orderPDtail = async function(detailSubId1, detailSubId2, productId){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const getProductD = await orderDao.selcetProductD(connection, detailSubId1, detailSubId2, productId);
        console.log(getProductD);
        return getProductD[0]
    }catch (err) {
        logger.error(`App - orderDetail Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
exports.postAddresss = async function(userId, deliveryPlaceName, userName, userNumber, deliveryPlace){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const AddressResult = await orderDao.insertAddress(connection, userId, deliveryPlaceName, userName, userNumber, deliveryPlace);
    }catch (err) {
        logger.error(`App - orderAddress Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}