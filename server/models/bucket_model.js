console.log('Users model');
var mongoose = require('mongoose');

var BucketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have name']
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

var Bucket = mongoose.model('Bucket', BucketSchema)
