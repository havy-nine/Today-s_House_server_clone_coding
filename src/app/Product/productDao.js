


async function selectProdId(connection, prodId){
    const selectProdIdQuery = 'select concat(categoryName, \' > \', categoryDetailName)                             as \'category\',\n' +
            '       mainImg,\n' +
            '       brand,\n' +
            '       productName,\n' +
            '       concat(salePercent,\'%\') as \'salepercent\',\n' +
            '       FORMAT(productPrice, 0) as \'price\',\n' +
            '       concat(FORMAT(productPrice*(salePercent/100), 0)   ,\'원\')                                                  as sale_price,\n' +
            '       isSpecialPrice as \'special price\',\n' +
            '       case\n' +
            '           when deliveryPrice = 0\n' +
            '               then \'free delivery\'\n' +
            '           when deliveryPrice != 0 then concat(FORMAT(deliveryPrice, 0), \' 원\') end as \'delivery price\'\n' +
            '        ,\n' +
            '       brand\n' +
            'from product P\n' +
            '         left join (select C.categoryId, categoryName, cD.categoryDetailName, cD.categoryDetailId\n' +
            '                     from category C\n' +
            '                              inner join categoryDetail cD on C.categoryId = cD.categoryId) T\n' +
            '                    on T.categoryId = P.categoryId And T.categoryDetailId = P.categoryDetailId\n' +
            'where P.productId = ?;';
        ;
    const prodIdQueryRows = await connection.query(selectProdIdQuery, prodId);

    return prodIdQueryRows;
}

async function selectInfoImg(connection, prodId){
    const selectInfoImgQuery = 'select DetailImgUrl from productDetailImg pDI inner join product p on pDI.productId = p.productId where pDI.productId = ?;\t\t';
    const InfoImgQueryRows = await connection.query(selectInfoImgQuery, prodId);

    return InfoImgQueryRows;
}

async function selectStarRating(connection,prodId){
    const selectStarRatingQuery = 'select count(review.totalRating) as \'number of review\',round(sum(review.totalRating) / count(*), 1)         as \'StarRating\',\n' +
        '       count(If(review.totalRating = 5, review.totalRating, NULL)) as \'5 point\',\n' +
        '       count(If(review.totalRating = 4, review.totalRating, NULL)) as \'4 point\',\n' +
        '       count(If(review.totalRating = 3, review.totalRating, NULL)) as \'3 point\',\n' +
        '\n' +
        '       count(If(review.totalRating = 2, review.totalRating, NULL)) as \'2 point\',\n' +
        '       count(If(review.totalRating = 1, review.totalRating, NULL)) as \'1 point\'\n' +
        'from review\n' +
        '         inner join product\n' +
        'on product.productId = review.productId where product.productId = ?;'

    const StarRatingQueryRows = await connection.query(selectStarRatingQuery, prodId);
    return StarRatingQueryRows;
}

async function selectReview(connection,prodId){
    const selectReviewQuery = 'select profileImg, nickname, totalRating, DATE_FORMAT(now(), \'%y.%m.%d\') as \'date of review\', reviewImgUrl, reviewText\n' +
        'from review r\n' +
        '         inner join user U\n' +
        'on U.userId = r.userId where r.productId = ?;'
    const ReviewQueryRows = await connection.query(selectReviewQuery, prodId);

    return ReviewQueryRows;
}


async function selectCategoryId(connection ,prodId){
    const selectCIDQuery = 'select categoryId from product where productId = ?;';
    const CIdRows = await connection.query(selectCIDQuery, prodId);

    return CIdRows;
}




async function selectRecommend(connection,categoryId, prodId){
    const selectRecommendQuery = 'select mainImg, brand, productName, salePercent, reviewNum, isSpecialPrice from product p\n' +
        ' where categoryId = ?' +
        ' And p.productId !=?;';

    const RecommendQueryRows = await connection.query(selectRecommendQuery, [categoryId, prodId]);

    return RecommendQueryRows;
}

async function selectOptionlistId(connection, productId) {
    const selectOptionlistId = 'select optionlistId\n' +
        'from optionlist where productId = ?;'
    const optionlistIdRows = await connection.query(selectOptionlistId, productId);
    return optionlistIdRows;
}

async function selectOptionlist(connection, productId) {
     const selectOptionlistQuery1 = 'select optionName, optionTitle, productId, optionlist.optionlistId, detailSubId from optionlist\n' +
         'inner join detailSub dS on optionlist.optionlistId = dS.optionlistId where productId = ?;';
    const optionlistRows = await connection.query(selectOptionlistQuery1, productId);
    return optionlistRows;

}

async function selectOption(connection, productId) {
    const selectOptionQuery = 'select optionName, productId, optionlistId from optionlist where productId = ?;';
    const optionQuery = await connection.query(selectOptionQuery, productId);

    return optionQuery;
}

module.exports ={
    selectProdId,
    selectInfoImg,
    selectStarRating,
    selectReview,
    selectCategoryId,
    selectRecommend,
    selectOptionlist,
    selectOptionlistId,
    selectOption

}