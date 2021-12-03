module.exports = function(app) {
    const main = require('./mainController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    app.get('/main', main.getMain);

    app.get('/main/category/:categoryId', main.getMainCategory);

    app.get('/main/photo', main.getPhoto);

    app.get('/main/houses', main.getHouses);

    app.get('/main/houses/prof', main.getHousesp);


    app.get('/main/qna', main.getQnA);
}