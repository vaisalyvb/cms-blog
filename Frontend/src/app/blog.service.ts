import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get("http://localhost:8000/users")
  }

  // approve admin

  approve(user:any){
    return this.http.put("http://localhost:8000/approve",user)
    .subscribe(data=>{
      console.log(data);
    })
}

// deleteadmin

delete(user:any){
  return this.http.put("http://localhost:8000/deleteadmin",user)
  .subscribe(data=>{
    console.log(data);
  })
}

//new post
newPost(post:any){
  return this.http.post("http://localhost:8000/post", post)
  .subscribe(data=>{console.log(data)})
}

//get posts
getPosts(){
  return this.http.get("http://localhost:8000/posts")
}
//add category
addcat(cat:any){
  var category={
    cat:cat
  }
  return this.http.post("http://localhost:8000/addcat", category)
  .subscribe(data=>{console.log(data)})
}

//getCategory
getCategory(){
  return this.http.get("http://localhost:8000/category")
}

//get updated category
updateCat(id:any){
  return this.http.get("http://localhost:8000/updatecat/"+id);
}

//update category
updateCategory(cat:any,id:any){

 var data={
   cat:cat,
   id:id
 }
  return this.http.put("http://localhost:8000/updatecategory",data)
  .subscribe(data=>{
    console.log(data);
  })
}

//delete category
deleteCat(id:any){
  return this.http.delete("http://localhost:8000/deletecat/"+id)
  .subscribe(data=>{
    console.log(data);
  })
  
}

//getsingleblog
getBlog(id:any){
  return this.http.get("http://localhost:8000/singlepost/"+id);
}

//category component-display category
searchCategory(cat:any){
  return this.http.get("http://localhost:8000/category/"+cat);
}

//dashboard component-dashboard category
dashboard(email:any){
  return this.http.get("http://localhost:8000/dashboard/"+email);
}

//get update blog
getupdateBlog(id:any){
  return this.http.get("http://localhost:8000/update/"+id);
}

//update blog
editBlog(blog:any){
  return this.http.put("http://localhost:8000/updateblog",blog)
  .subscribe(data=>{
    console.log(data);
  })
}

//blog
deleteBlog(id:any){
  return this.http.delete("http://localhost:8000/deleteblog/"+id)
}

//getuser
getuser(id:any){
  return this.http.get("http://localhost:8000/usersget/"+id);
}

getValue(){
  return !!localStorage.getItem("admin")
}

getUser(){
  return !!localStorage.getItem("userid")
}

getRootUser(){
  return !!localStorage.getItem("rootuser")
}

}

