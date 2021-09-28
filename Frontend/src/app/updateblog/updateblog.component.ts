import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.component.html',
  styleUrls: ['./updateblog.component.css']
})
export class UpdateblogComponent implements OnInit {

  posts = {
    id: '',
    title: '',
    author: '',
    email: '',
    introduction: '',
    content: '',
    category: '',
    date: '',
    image: '',
  };

  name = 'ng2-ckeditor';
  ckeConfig: any;
  useremaill: any;

  categorys = [
    {
      catname: '',
    },
  ];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
    };

    this.blogService.getCategory().subscribe((data) => {
      this.categorys = JSON.parse(JSON.stringify(data));
    });

    let postid = localStorage.getItem('updateblog');
    this.blogService.getupdateBlog(postid).subscribe((data) => {
      this.posts = JSON.parse(JSON.stringify(data));
    });
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.posts.image = file;
    }
  }

  selectCat(event: any) {
    this.posts.category = event.target.value;
  }

  updatepost(posts: any) {
    posts = posts._id;
    const formData = new FormData();
    formData.append('image', this.posts.image);
    formData.append('title', this.posts.title);
    formData.append('author', this.posts.author);
    formData.append('email', this.posts.email);
    formData.append('introduction', this.posts.introduction);
    formData.append('content', this.posts.content);
    formData.append('category', this.posts.category);
    formData.append('date', this.posts.date);
    formData.append('id', posts);

    this.blogService.editBlog(formData);
    console.log('called');
    Swal.fire({
      position:'center',
      title: 'Updated successfully',
      showConfirmButton: false,
      timer: 1500,
    });
     this.router.navigate(['/blog']);
  }
}


