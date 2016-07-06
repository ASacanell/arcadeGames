module.exports = function(app) {
    var pong = require('../controllers/tanks.server.controller');
    app.get('/tanks', pong.render);
};