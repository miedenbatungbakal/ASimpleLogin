var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },

    info: {
        firstname: String,
        middlename: String,
        lastname: String
    }
});

userSchema.methods.generateHash = function(password){
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(9));
};

userSchema.methods.validPassword = function(password){
    return bcryptjs.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);