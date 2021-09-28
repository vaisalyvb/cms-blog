import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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

  constructor(public blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    let userid = localStorage.getItem('userid');
    this.blogService.getuser(userid)
      .pipe(
        map((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          return this.user;
        }),
        mergeMap((user) => this.blogService.dashboard(user.email))
      )
      .subscribe((data) => {
        this.posts = JSON.parse(JSON.stringify(data));
      });

    let adminid = localStorage.getItem('admin');
    this.blogService.getuser(adminid)
      .pipe(
        map((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          return this.user;
        }),
        mergeMap((user) => this.blogService.dashboard(user.email))
      )
      .subscribe((data) => {
        this.posts = JSON.parse(JSON.stringify(data));
      });
  }

  singleBlog(post: any) {
    localStorage.setItem('singlepost', post._id.toString());
    this.router.navigate(['singlepost']);
  }

  update(post: any) {
    localStorage.setItem('updateblog', post._id.toString());
    this.router.navigate(['updateblog']);
  }

  delete(post: any) {
    Swal.fire({
      text: 'Delete this post?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result:any) => {
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
        this.router.navigate(['/dashboard']);
      }
    });
  }

  logout() {
    localStorage.removeItem('rootuser');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}
