import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.css'],
})
export class ManagecategoryComponent implements OnInit {
  cat: any;
  updatetoggle: Boolean = false;
  event: any;
  updatecategory: any;
  checkIfOthersAreSelected: Boolean = false;
  cate: any;

  categorys = [
    {
      catname: '',
    },
  ];

  updatecate = {
    catname: '',
  };

  constructor(public blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getCategory().subscribe((data) => {
      this.categorys = JSON.parse(JSON.stringify(data));
    });

  }

  add() {
    this.blogService.addcat(this.cat);
    this.cat = '';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/managecategory']);
  }

  check(category: any) {
    this.updatecategory = category._id;
    this.cate = category;
  }

  change(event: any) {
    this.event = event.target.checked;
    this.checkIfOthersAreSelected = true;
  }

  update() {
    if (this.event) {
      localStorage.setItem('editcategoryid', this.updatecategory.toString());
      this.updatetoggle = true;
      let categoryid = localStorage.getItem('editcategoryid');
      this.blogService.updateCat(categoryid).subscribe((data) => {
      this.updatecate = JSON.parse(JSON.stringify(data));
      });
    } else {
      alert('Select category and click Update category');
    }
  }

  updatecat() {
    this.updatetoggle = false;
    this.blogService.updateCategory(
      this.updatecate.catname,
      this.updatecategory
    );
    Swal.fire({
      position:'center',
      title: 'Updated successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/managecategory']);
  }
 

  delete() {
    if (this.event) {
      Swal.fire({
        text: 'Delete this category ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.blogService.deleteCat(this.updatecategory);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/managecategory']);

          Swal.fire({
            position:'center',
            title: 'Deleted successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/managecategory']);
        }
      });
    } else {
      alert('Choose a category and Click Delete');
    }
  }

  logout() {
    localStorage.removeItem('rootuser');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}
