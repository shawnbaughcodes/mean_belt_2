console.log('Buckets controller');
var mongoose = require('mongoose');

var Bucket = mongoose.model('Bucket')
var User = mongoose.model('User')

module.exports = {
    index: function(req, res){
        Bucket.find({}).populate('user').populate('items').exec(function(err, buckets){
            if(err){
                return res.json(err)
            }
            return res.json(buckets)
        })
    },
    create: function(req, res){
        Bucket.create(req.body, function(err, bucket){
            if(err){
                return res.json(err)
            }
            User.findById(req.body.user, function(err, user){
                if(err){
                    return res.json(err)
                }
                user.buckets.push(bucket._id)
                user.save(function(err, user){
                    if(err){
                        return res.json(err)
                    }
                    return res.json(bucket)
                })
            })
        })
    },
    show: function(req, res){
        Bucket.findById(req.params.id).exec(function(err, bucket){
            if(err){
                return res.json(err)
            }
            return res.json(bucket)
        })
    }
}
