const jwtMiddleware = require("../../../config/jwtMiddleware");
const mainProvider = require("../../app/main/mainProvider");
const mainService = require("../../app/main/mainService");
const mainDao = require("../../app/main/mainDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {pool} = require("../../../config/database");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const {logger} = require("../../../config/winston");
const {getCategory} = require("./mainDao");
const {SUCCESS} = require("../../../config/baseResponseStatus");


exports.getMain = async function (req, res) {
try {
    const connection = await pool.getConnection(async (conn) => conn);

    const selectEvent = await mainDao.getEvent(connection);
    if(selectEvent.length<1) return res.send(errResponse(baseResponse.MAIN_EVENT_EMPTY));

    const selectStory = await mainDao.getStory(connection);
    if(selectStory.length<1) return res.send(errResponse(baseResponse.MAIN_STORY_EMPTY));

    const selectCategories = await mainDao.getCategory(connection);
    if(selectCategories.length<1) return res.send(errResponse(baseResponse.MAIN_CATEGORY_EMPTY));

    const selectTodayDeal = await mainDao.getTDeal(connection);
    if(selectTodayDeal.length<1) return res.send(errResponse(baseResponse.MAIN_TODAYDEAL_EMPTY));

    const selectPhoto = await mainDao.getPhoto(connection);
    if(selectPhoto.length<1) return res.send(errResponse(baseResponse.MAIN_PHOTO_EMPTY));

    const selectInteriorReview = await mainDao.getInterior(connection);
    if(selectInteriorReview.length<1) return res.send(errResponse(baseResponse.MAIN_INTERIOR_EMPTY));

    const selectBestAll = await mainDao.getBestAll(connection);
    if(selectBestAll.length<1) return res.send(errResponse(baseResponse.MAIN_BEST_EMPTY));

    connection.release();

    return res.json({
        isSuccess : "true",
        code : 1000,
        message: "성공",
        result:{event: selectEvent,
        todayStory: selectStory,
        category: selectCategories,
        todayDeal: selectTodayDeal[0],
        Photo: selectPhoto,
        InteriorReview: selectInteriorReview,
        BestAll:selectBestAll}

    })

} catch (err) {
    logger.error(`App - getMain Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
}
}

exports.getMainCategory = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        const connection = await pool.getConnection(async (conn) => conn);

        const getCategoryProduct = await mainDao.getProdByCategory(connection, categoryId);

        connection.release();
        if(getCategoryProduct.length<1) return res.send(errResponse(baseResponse.MAIN_PRODUCT_BY_CATEGORY_EMPTY));
        return res.json({
            isSuccess: true,
            code: 1000,
            message:'성공',
            result: getCategoryProduct
        })

    } catch (err) {
    logger.error(`App - getMainCategory  error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
}
};

exports.getPhoto = async function (req, res) {

    try {
        let sortBy = req.query.sortBy;
        const connection = await pool.getConnection(async(conn)=> conn);

        const getPhoto = await mainDao.selectPhoto(connection);
        if(getPhoto.length<1) return res.send(errResponse(baseResponse.MAIN_PHOTO_IS_EMPTY));
        if(sortBy == null) sortBy ='인기순';
        if(sortBy=='인기순'){
            getPhoto.sort(function(a,b){
                return b.likes - a.likes;
            })
        }else if(sortBy=='최신순'){
            getPhoto.sort(function(a,b){
                return b.createdAt - a.createdAt;
            })
        }else if(sortBy=='과거순'){
            getPhoto.sort(function(a,b){
                return a.createdAt - b.createdAt;
            })
        }


        console.log(getPhoto[0].likes);

        return res.json({
            isSuccess: true,
            code: 1000,
            message:'성공',
            photo: getPhoto
        })

    } catch (err) {
        logger.error(`App - getMainCategory  error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.getHouses = async function (req,res) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        let sortBy = req.query.sortBy;
        const gethouses = await mainDao.selecthouses(connection);

        if (gethouses.length < 1) return res.send(errResponse(baseResponse.MAIN_PHOTO_IS_EMPTY));

        if (sortBy == null) sortBy = '인기순';

        if (sortBy == '인기순') {
            gethouses.sort(function (a, b) {
                return b.view - a.view;
            })
        } else if (sortBy == '최신순') {
            gethouses.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            })
        } else if (sortBy == '과거순') {
            gethouses.sort(function (a, b) {
                return a.createdAt - b.createdAt;
            })
        }
         return res.json({
            isSuccess: true,
            code: 1000,
            message:'성공',
            photo: gethouses
        })

    } catch (err) {
        logger.error(`App - getHouses  error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getHousesp = async function (req,res) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        let sortBy = req.query.sortBy;
        const gethousesp = await mainDao.selecthousesp(connection);

        if (gethousesp.length < 1) return res.send(errResponse(baseResponse.MAIN_PHOTO_IS_EMPTY));

        if (sortBy == null) sortBy = '인기순';

        if (sortBy == '인기순') {
            gethousesp.sort(function (a, b) {
                return b.view - a.view;
            })
        } else if (sortBy == '최신순') {
            gethousesp.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            })
        } else if (sortBy == '과거순') {
            gethousesp.sort(function (a, b) {
                return a.createdAt - b.createdAt;
            })
        }
        return res.json({
            isSuccess: true,
            code: 1000,
            message:'성공',
            photo: gethousesp
        })

    } catch (err) {
        logger.error(`App - getHouses  error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getQnA = async function (req, res) {
    try{
        const connection = await pool.getConnection( async (conn) => conn);
        let sortBy = req.query.sortBy;
        let getNoti = await mainDao.selectNoti(connection);
        if (getNoti.length < 1) getNoti = { message : '공지가 없습니다.'};

        const getQuestion = await mainDao.selectQuestion(connection);

        if (getQuestion.length < 1) return res.send(errResponse(baseResponse.MAIN_QNA_IS_EMPTY));

        console.log(getQuestion[0].views);
        if (sortBy == '인기순') {
            getQuestion.sort(function (a, b) {
                return b.view - a.view;
            })
        } else if (sortBy == '최신순') {
            getQuestion.sort(function (a, b) {
                return b.c - a.c;
            })
        } else if (sortBy == '과거순') {
            getQuestion.sort(function (a, b) {
                return a.c - b.c;
            })
        }

        return res.json({
            isSuccess: true,
            code: 1000,
            message:'성공',
            result : {
                notification: getNoti,
                Question: getQuestion


            }
            })



    }catch (err) {
        logger.error(`App - getQnA  error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}