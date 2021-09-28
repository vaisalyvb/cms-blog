import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  posts = {
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

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  };

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

    let userid = localStorage.getItem('userid');
    this.blogService.getuser(userid).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
    });

    let adminid = localStorage.getItem('admin');
    this.blogService.getuser(adminid).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
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

  createpost() {
    const formData = new FormData();
    formData.append('image', this.posts.image);
    formData.append('title', this.posts.title);
    formData.append('author', this.posts.author);
    formData.append('email', this.posts.email);
    formData.append('introduction', this.posts.introduction);
    formData.append('content', this.posts.content);
    formData.append('category', this.posts.category);
    formData.append('date', this.posts.date);

    if (this.user.email == this.posts.email) {
      this.blogService.newPost(formData);
      console.log('Called');
      Swal.fire({
        position:'center',
        title: 'Post created',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/blog']);
    } else if (this.user.email != this.posts.email) {
      alert('Please enter your registered email id');
    }
  }

}
