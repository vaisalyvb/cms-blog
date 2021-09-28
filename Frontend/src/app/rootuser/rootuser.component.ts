import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rootuser',
  templateUrl: './rootuser.component.html',
  styleUrls: ['./rootuser.component.css']
})
export class RootuserComponent implements OnInit {

  users = [
    {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      role: '',
    },
  ];

  approvedisable: Boolean = true;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getUsers().subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
    });
  }

  approve(user: any) {
    Swal.fire({
      text: 'Promote as admin ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.approve(user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/rootuser']);

        Swal.fire({
          position:'center',
          title: 'Approved successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.router.navigate(['/rootuser']);
      }
    });
  }

  delete(user: any) {
    Swal.fire({
      text: 'Delete admin privilege ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.delete(user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/rootuser']);

        Swal.fire({
          position:'center',
          title: 'Removed successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.router.navigate(['/rootuser']);
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

