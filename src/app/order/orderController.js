
const jwtMiddleware = require("../../../config/jwtMiddleware");
const orderProvider = require("../../app/order/orderProvider");
const orderService = require("../../app/order/orderService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");



exports.postorder = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;

    const userId = req.params.userId;
    const productId = req.params.productId;
  //  const optionlistId = req.query.optionlistId;
    const detailSubId1 = req.query.detailSubId1;
    const detailSubId2 = req.query.detailSubId2;

    if(userId != userIdFromJWT) {
        return  res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    if(!productId) return res.send(errResponse(baseResponse.ORDER_PROD_ID_EMPTY));


    const orderdelivery = await orderService.orderProd(userId, productId, detailSubId1, detailSubId2);
    const orderPerson = await orderService.orderP(userId);
    //console.log(orderPerson);
    const orderProd = await orderService.orderProduct(productId);
    const orderPDetail = await orderService.orderPDtail(detailSubId1, detailSubId2, productId);
    // if(orderProd.length<1) {
    //     return res.send(response(baseResponse.DB_ERROR));}
    let deliverPrice = orderProd[0].price;
    if(deliverPrice == '무료배송') deliverPrice = 0;
    return res.json({
        isSuccess : true,
        code : 1000,
        message : '성공',
        result : {
            delivery : orderdelivery[0],
            orderPerson : orderPerson[0],
            product : orderProd[0],
            productDtail : orderPDetail,
            price : {
                totalProductPrice : orderPDetail[0].price+orderPDetail[1].price,
                deliveryPrice : deliverPrice,
                totalPrice : orderPDetail[0].price+orderPDetail[1].price+deliverPrice
            }
        }
    })


}

exports.postdeliveryPlace = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userId
    const userId = req.params.userId;
    const {deliveryPlaceName, userName, userNumber, deliveryPlace} = req.body;
    if(userIdFromJWT != userId) return res.send(response(baseResponse.USER_ID_NOT_MATCH));
    if(!deliveryPlaceName) return res.send(response(baseResponse.DELIVERY_NAME_EMPTY));
    if(!userName) return res.send(response(baseResponse.USER_NAME_EMPTY));
    if(!userNumber) return res.send(response(baseResponse.USER_NUMBER_EMPTY));
    if(!deliveryPlace) return res.send(response((baseResponse.DELIVERY_PLACE_EMPTY)));

    const postAddress = await orderService.postAddresss(userId,deliveryPlaceName, userName, userNumber, deliveryPlace);

    return res.send(response(baseResponse.SUCCESS));
}