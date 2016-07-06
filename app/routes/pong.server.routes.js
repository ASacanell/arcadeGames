module.exports = function(app) {
    var pong = require('../controllers/pong.server.controller');
    app.get('/pong', pong.render);
};