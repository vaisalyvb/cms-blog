import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './category/category.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { RootuserComponent } from './rootuser/rootuser.component';
import { SignupComponent } from './signup/signup.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'managecategory',component:ManagecategoryComponent},
  {path:'createpost',component:CreatepostComponent},
  {path:'footer',component:FooterComponent},
  {path:'login',component:LoginComponent},
  {path:'category/:cat',component:CategoryComponent},
  {path:'signup',component:SignupComponent},
  {path:'singlepost',component:SinglepostComponent},
  {path:'rootuser',component:RootuserComponent},
  {path:'updateblog',component:UpdateblogComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'blog',component:BlogComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
