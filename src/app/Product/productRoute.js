module.exports = function(app) {
    const prod = require('./productController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    app.get('/prod/:productId/info', prod.getProd);

    app.get('/prod/:productId/optionlist', prod.getOptionlist);
}