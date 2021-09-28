const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/CMS?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
const Schema = mongoose.Schema;
const CatSchema = new Schema({
    catname:String,
});
var Category = mongoose.model('categorydatas',CatSchema);
module.exports = Category;