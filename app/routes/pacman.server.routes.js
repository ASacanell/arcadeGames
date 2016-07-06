module.exports = function(app) {
    var pacman = require('../controllers/pacman.server.controller');
    app.get('/pacman', pacman.render);
};