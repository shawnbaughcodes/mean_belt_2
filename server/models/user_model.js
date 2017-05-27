console.log('Users model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Must have First Name']
    },
    last_name: {
        type: String,
        required: [true, 'Must have Last Name']
    },
    email: {
        type: String,
        required: [true, 'Must have Email'],
        validate: {
            validator: function(v){
                return /\S*\@\S*\.\S+/g.test(v);
            },
            message: 'Email must be valid.',
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must enter a Password']
    }
})

UserSchema.methods.hashPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
UserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
}
UserSchema.pre('save', function(callback) {
    this.hashPassword(this.password);
    callback();
});

var User = mongoose.model('User', UserSchema)
