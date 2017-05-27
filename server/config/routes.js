console.log('Seeing routes');
var fs = require('fs');
var path = require('path');

var Users = require('../controllers/users_controller');
var Buckets = require('../controllers/buckets_controller');
var Items = require('../controllers/items_controller');

module.exports = function(app) {
    app.get('/users', Users.index);
    app.get('/users/:id', Users.show);
    app.post('/users', Users.create);
    app.post('/sessions', Users.login);

    app.get('/buckets', Buckets.index);
    app.get('/buckets/:id', Buckets.show);
    app.post('/buckets', Buckets.create);

    app.get('/items', Items.index);
    app.post('/items', Items.create);
}
