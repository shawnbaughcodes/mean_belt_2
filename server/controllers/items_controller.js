console.log('Buckets controller');
var mongoose = require('mongoose');

var Bucket = mongoose.model('Bucket')
var User = mongoose.model('User')
var Item = mongoose.model('Item')

module.exports = {
    index: function(req, res){
        Item.find({}).populate('user').populate({
            path: 'bucket',
            model: 'Bucket',
            populate: {
                path: 'items',
                model: 'Item'
            }
        }).exec(function(err, item){
            if(err){
                return res.json(err)
            }
            return res.json(item)
        })
    },
    create: function(req, res){
        Item.create(req.body, function(err, item){
            if(err){
                return res.json(err)
            }
            Bucket.findByIdAndUpdate(req.body.bucket, { $push: { items: item._id }}, function(err, bucket){
                if(err){
                    return res.json(err)
                }
                    User.findById(req.body.user, { $push: { items: item._id }}, function(err, user){
                        if(err){
                            return res.json(err)
                        }
                        return res.json(item)
                        })
                    })
                })
            }
}
