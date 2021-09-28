import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts=[{
    id:'',
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    image:''
  }]

  constructor( private router:Router) { }

  ngOnInit(): void {}

  singleBlog(post:any){
    localStorage.setItem("singlehblog", post._id.toString());
    this.router.navigate(['singlehome']);
  }

}

