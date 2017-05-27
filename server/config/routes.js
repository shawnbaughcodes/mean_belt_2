console.log('Seeing routes');
var fs = require('fs');
var path = require('path');

var Users = require('../controllers/users_controller');


module.exports = function(app) {
    app.get('/users', function(req, res) {
        Users.index(req, res);
    });
    app.get('/users/:id', function(req, res) {
        Users.show(req, res);
    });
    app.post('/users', function(req, res) {
        Users.create(req, res);
    });
    app.put('/users/:id', function(req, res) {
        Users.update(req, res);
    });
    app.delete('/users/:id', function(req, res) {
        Users.delete(req, res);
    });
    app.post('/sessions', function(req, res){
        Users.login(req, res);
    });
}
