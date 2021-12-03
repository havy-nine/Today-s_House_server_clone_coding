async function selectDeliveryPlace(connection, userId) {
    const selectDeliveryPlaceQuery ='select userName, status, deliveryplace, userName, userNumber\n' +
        'from deliveryPlace where userId = ? and status = \'기본배송지\';'

    const DeliveryPlaceRow = await connection.query(selectDeliveryPlaceQuery, userId);
    return DeliveryPlaceRow;
}

async function selectOrderPerson(connection,userId){
    const selectorderPersonQuery = 'select userName, userNumber from deliveryPlace where userId = ? ;';

    const orderPersonRow = await connection.query(selectorderPersonQuery, userId);

    return orderPersonRow;

}
async function selectProduct(connection, productId){
    const pDtailQuery = 'select brand,\n' +
        '       case\n' +
        '           when deliveryPrice = 0\n' +
        '               then \'무료배송\'\n' +
        '           when deliveryprice > 0\n' +
        '               then concat(deliveryprice, \' 원\')  end as \'price\', mainImg,\n' +
        '       productName\n' +
        'from product where productId = ?;';
    const pdtailRows = await connection.query(pDtailQuery, productId);
    return pdtailRows;

}
async function selcetProductD(connection,detailSubId1, detailSubId2, productId ){
    const detailSubId = detailSubId1;
    const detailParams = {detailSubId, detailSubId2, productId};
    const productDatilQuery = 'select concat(optionName,\': \', optionTitle) as \'option\', dS.price\n' +
        '                            from optionlist\n' +
        '                                     join detailSub dS on optionlist.optionlistId = dS.optionlistId\n' +
        '                         where  detailSubId = ? or detailSubId = ? and productId = ?;';
   // console.log(detailParams);
    const pdtailRows = await connection.query(productDatilQuery, [detailSubId ,detailSubId2, productId]);
       // ;
    return pdtailRows;
}
async function insertAddress(connection, userId, deliveryPlaceName, userName, userNumber, deliveryPlace){
    const postAddressQuery = 'insert into deliveryPlace(userId, deliveryPlaceName, userName, userNumber, deliveryPlace)' +
        'values(?, ?, ?, ?, ?);';
    const postAddressRow = await connection.query(postAddressQuery, [userId, deliveryPlaceName, userName, userNumber, deliveryPlace])
    return postAddressRow[0];
}



module.exports={
    selectDeliveryPlace,
    selectOrderPerson,
    selectProduct,
    selcetProductD,
    insertAddress


}