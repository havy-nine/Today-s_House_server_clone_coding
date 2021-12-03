
async function getEvent(connection){
    const selectEventQuery = 'select eventImg from event;';

    const eventRows = await connection.query(selectEventQuery);
    console.log(eventRows[0]);
    return eventRows[0];
}



async function getStory(connection) {

    const selectStoryQuery ='select mainImg, Title from houses;'


    const  storyRows = await connection.query(selectStoryQuery);

    return storyRows[0];

}

async function getCategory(connection) {
    const selectCategoryQuery ='select categoryImgUrl, categoryName from category;';

    const categoryRows = await connection.query(selectCategoryQuery);

    return categoryRows[0];

}

async function getTDeal(connection){
    const selectTDealQuery = 'select mainImg,concat(sec_to_time(timestampdiff(second, current_timestamp,todaydealdaytime )), \' 남음\') as ' +
        '\'TodaysDealtimeremaining\', productName, concat(salePercent,\' %\') as salePercent from product where isSpecialPrice = \'yes\';\n';

    const TdealRows = await connection.query(selectTDealQuery);

    return TdealRows[0]
}

async function getPhoto(connection){
    const selectPhoto = '\n' +
        'select imgUrl, nickname, text, likes, scrap, comment from imageTap\n' +
        'inner join user u where u.userId = imageTap.userId;';
    const photoRows = await connection.query(selectPhoto);

    return photoRows[0];
}

async function getInterior(connection){
    const selectInteriorquery = 'select reviewImgUrl, integrated, reviewText, profileImg, nickname  from interiorReview\n' +
        'inner join user u where u.userId = interiorReview.userId;';
    const interiorRows = await connection.query(selectInteriorquery);

    return interiorRows[0];

}
async function getBestAll(connection) {
    const selectBestQuery = 'select mainImg,\n' +
        '       productName,\n' +
        '       salePercent,\n' +
        '       concat(FORMAT(productPrice * (salePercent / 100), 0)) as \'price\',\n' +
        '       p.totalRating,\n' +
        '       reviewNum,\n' +
        'p.productId' +
        '     from product p\n' +
        'group by p.productId\n' +
        'order by reviewNum DESC;';
    const bestRows = await connection.query(selectBestQuery);

    return bestRows[0];
}


async function getProdByCategory(connection, categoryId){
    const selectPByCQuery = 'select mainImg,\n' +
        '       productName,\n' +
        '       salePercent,\n' +
        '       concat(FORMAT(productPrice * (salePercent / 100), 0)) as \'price\',\n' +
        '       p.totalRating,\n' +
        '       reviewNum,' +
        'p.productId from product p where categoryId = ? order by reviewNum;'

    const productByCategoryId = await connection.query(selectPByCQuery, categoryId);

    return productByCategoryId[0];
}
async function selectPhoto(connection){
    const selectPhotoQuery = 'select imgUrl, text,createdAt, likes from imageTap;';

    const photoRow = await connection.query(selectPhotoQuery);

    return photoRow[0];
}

async function selecthouses(connection){
    const selectHousesQuery = 'select mainImg, Title, profileImg, nickname, concat(format(scrap,0), \'명 스크랩\') as scrap, concat(format(view,0),\'명 조회\') as views,' +
        'view, houses.createdAt \n' +
        'from houses\n' +
        'inner join user u on u.userId = houses.userId where professional = \'n\'' +
        ';';
    const housesRow = await connection.query(selectHousesQuery);

    return housesRow[0];
}

async function selecthousesp(connection){
    const selectHousesQuery = 'select mainImg, Title, profileImg, nickname, concat(format(scrap,0), \'명 스크랩\') as scrap, concat(format(view,0),\'명 조회\') as views,' +
        'view, houses.createdAt \n' +
        'from houses\n' +
        'inner join user u on u.userId = houses.userId where professional = \'y\'' +
        ';';
    const housesRow = await connection.query(selectHousesQuery);

    return housesRow[0];
}
async function selectNoti(connection){
    const selectNotiQuery = 'select notiTitle from questionNotification;';
    const notiRows = await connection.query(selectNotiQuery);

    return notiRows[0];
}
async function selectQuestion(connection){
    const selectQuestionQuery = 'select questionTitle, profileImg  ,nickname, DATE_FORMAT(q.createdAt, \'%y.%m.%d\') as createdAt, concat(\'댓글 \', commentNum) as comment, concat(\'조회 \', views) as views, questionImg, views as view,q.createdAt as c\n' +
        'from question q\n' +
        'inner join user u on u.userId = q.userId;';
    const questionRows = await connection.query(selectQuestionQuery);

    return questionRows[0];
}

module.exports={
    getEvent,
    getInterior,
    getStory,
    getCategory,
    getTDeal,
    getPhoto,
    getBestAll,
    getProdByCategory,
    selectPhoto,
    selecthouses,
    selecthousesp,
    selectNoti,
    selectQuestion
}