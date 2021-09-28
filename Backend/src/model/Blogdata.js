const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/CMS?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title:String,
    author:String,
    email:String,
    introduction:String,
    content:String,
    category:String,
    date:String,
    image:String
});
var Blogdata = mongoose.model('blogdata',BlogSchema);
module.exports = Blogdata;