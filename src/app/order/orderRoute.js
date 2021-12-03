module.exports = function(app){
    const order = require('./orderController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    app.post('/order/:userId/product/:productId/', jwtMiddleware, order.postorder)
    app.post('/order/:userId/delivery-place', jwtMiddleware, order.postdeliveryPlace)
}