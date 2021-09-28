const express=require('express');
const app = new express();
var mongoose=require('mongoose');
const multer = require('multer');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const Blog=require('./src/model/Blogdata');
const User=require('./src/model/Userdata');
const Category=require('./src/model/Categorydata');

email='rootuser@gmail.com';
password='Rootuser@123';

//PORT
const port=process.env.PORT || 8000;
app.use(cors());

// POST middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

//middleware function..static
app.use(express.static('./public'));

// multer setup

// setting up storage folder destination and filename
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/images');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
 // specifying file type
  const fileFilter = (req,file,callback)=>{
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
   callback(null,true);
   }
   else{
       callback(null,false);
   }
  }
  
  const upload = multer({
      storage: storage,
      fileFilter:fileFilter
    });
  

// multer ends

//middleware for verifying token
function verifyRootuser(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let rootuser = req.headers.authorization.split(' ')[1]
  if(rootuser === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(rootuser, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}


// get users
app.get('/users',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        User.find()
        .then(function(users){
           res.send(users)     
        })
    })

// approve admin
app.put('/approve', verifyRootuser,(req,res)=>{
  console.log(req.body)
  id= req.body._id,
  firstname= req.body.firstname,
  lastname= req.body.lastname,
   email= req.body.email,
  password=req.body.password,
  phone= req.body.phone,
  role= "admin"
  
 User.findByIdAndUpdate({"_id":id},
                              {$set:{"firstname":firstname,
                              "lastname":lastname,
                              "email":email,
                              "password":password,
                              "phone":phone,
                               "role":role }})
 .then(function(){
     res.send();
 })
})

//Delete admin privilege
app.put('/deleteadmin',verifyRootuser,(req,res)=>{
  console.log(req.body)
  id= req.body._id,
  firstname= req.body.firstname,
  lastname= req.body.lastname,
   email= req.body.email,
  password=req.body.password,
  phone= req.body.phone,
  role= "user"
  
 User.findByIdAndUpdate({"_id":id},
                              {$set:{"firstname":firstname,
                              "lastname":lastname,
                              "email":email,
                              "password":password,
                              "phone":phone,
                               "role":role }})
 .then(function(){
     res.send();
 })
})


//create post
app.post('/post', upload.single('image'),function (req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    console.log(req.file);
 var blog={
   title:req.body.title,
   author:req.body.author,
   email:req.body.email,
   introduction:req.body.introduction,
   content:req.body.content,
   category:req.body.category,
   date:req.body.date,
   image: 'http://localhost:8000/images/'+ req.file.filename
}
var post =Blog(blog);
post.save();
})

//signup
    
app.post('/signup', (req, res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
User.findOne({email : req.body.email}).exec(function(err,user){
 console.log(user);
   if(user) {
    res.status(401).send({user})
    console.log("user exists");
} 

    else{

      var data = {
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        password : req.body.password,
        phone: req.body.phone
    }
    var data = new User(data);
    data.save();
    res.status(200).send();
  }
})
})
 


//login
app.post('/login', async(req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

  let emaild=req.body.email;
  let pwdd=req.body.password;
    
  let user = await User.findOne({role:"user",email: req.body.email, password:req.body.password})
  let token =  await User.findOne({role:"admin",email: req.body.email, password:req.body.password})

     try{

    if(req.body.email=="rootuser@gmail.com" && req.body.password=="Rootuser@123"){
        let payload={subject:email+password}
       let rootuser=jwt.sign(payload,'secretKey')  
       res.status(200).send({rootuser})
      }
     else if(user){ 
      res.status(200).send({user})
       console.log("success")
     }
     else if(token){
      res.status(200).send({token})
       console.log("admin")
     }
     else{
       res.status(401).send();
     }
    
     }
     catch(err){
      console.log(err)
     }
    
  })
  
// get posts
app.get('/posts',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    Blog.find()
      .then(function(posts){
         res.send(posts)     
      })
  })

//add category
//create post
app.post('/addcat',function (req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
   
 var category={
   catname:req.body.cat
}
var cat = Category(category);
cat.save();
})

//getcategory
app.get('/category',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      Category.find()
      .then(function(cat){
         res.send(cat)     
      })
  })
//get updateid category
app.get('/updatecat/:id',  (req, res) => {

  const id = req.params.id;
    Category.findOne({"_id":id})
    .then((cat)=>{
        res.send(cat);
    });
  })

//updatecategory
app.put('/updatecategory',(req,res)=>{
  console.log(req.body)
  id= req.body.id,
  catname= req.body.cat,
  
 Category.findByIdAndUpdate({"_id":id},
                              {$set:{"catname":catname,
                               }})
 .then(function(){
     res.send();
 })
})

//delete category
app.delete('/deletecat/:id',(req,res)=>{
   
  id = req.params.id;
  Category.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})

//get singleblog
app.get('/singlepost/:id',  (req, res) => {

  const id = req.params.id;
    Blog.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
  })

// search category
app.get('/category/:cat',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

      const cat = req.params.cat;

      Blog.find({"category": cat})
      .then(function(posts){
         res.send(posts)     
      })
  })

  // search dashboard
  app.get('/dashboard/:email',function(req,res){

      const email=req.params.email
        Blog.find({"email": email})
        .then(function(posts){
           res.send(posts)    
         })
    })


//get update blog
app.get('/update/:id',  (req, res) => {

  const id = req.params.id;
    Blog.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
  })

//get users
 app.get('/usersget/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
      User.findOne({"_id":req.params.id})
      .then(function(user){
         res.send(user)    
      })
  }
  })

//updateblog

app.put('/updateblog',upload.single('image'),(req,res)=>{

  id=req.body.id
  title= req.body.title,
  author = req.body.author,
  email=req.body.email,
  introduction = req.body.introduction,
  content = req.body.content,
  category=req.body.category,
  date=req.body.date,
  image = 'http://localhost:8000/images/'+ req.file.filename
  
    Blog.findByIdAndUpdate({"_id":id},
                              {$set:{"title":title,
                              "author":author,
                              "introduction":introduction,
                              "content":content,
                              "category":category,
                              "date":date,
                              "image":image}})
 .then(function(){
     res.send();
 })
})

//delete blog
app.delete('/deleteblog/:id',(req,res)=>{
   
  id = req.params.id;
  Blog.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})


//port

app.listen(port,()=>{
    console.log("Server Ready at"+port);
});
