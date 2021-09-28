import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  posts = [
    {
      id: '',
      title: '',
      author: '',
      email: '',
      introduction: '',
      content: '',
      category: '',
      date: '',
      image: '',
    },
  ];

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  };

  cat: any;

  constructor(
    public blogService: BlogService,
    private router: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.cat = params.cat;
      this.blogService.searchCategory(this.cat).subscribe((data) => {
        this.posts = JSON.parse(JSON.stringify(data));
      });
    });

    let userid = localStorage.getItem('userid');
    this.blogService.getuser(userid).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
    });
  }

  singleBlog(post: any) {
    localStorage.setItem('singlepost', post._id.toString());
    this._router.navigate(['singlepost']);
  }

  update(post: any) {
    localStorage.setItem('updateblog', post._id.toString());
    this._router.navigate(['updateblog']);
  }

  delete(post: any) {
    Swal.fire({
      text: 'Delete this post ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(post._id).subscribe((data) => {
          this.posts = this.posts.filter((p) => p !== post);
        });

        Swal.fire({
          position:'center',
          title: 'Deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this._router.navigate(['/category/:cat']);

      }
    });
  }

  logout() {
    localStorage.removeItem('rootuser');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    this._router.navigate(['/']);
  }
}
