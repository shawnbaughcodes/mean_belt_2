console.log('Item model');
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must have a title']
    },
    description: {
        type: String,
        required: [true, 'Must enter description']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bucket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bucket'
    }
    // user_tag: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

var Item = mongoose.model('Item', ItemSchema)
