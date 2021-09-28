const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/CMS?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String,
        default:'user'
    }
});
var User = mongoose.model('users',UserSchema);
module.exports = User;