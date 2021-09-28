import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { FooterComponent } from './footer/footer.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { CategoryComponent } from './category/category.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { RootuserComponent } from './rootuser/rootuser.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { BlogComponent } from './blog/blog.component';
import { BlogService } from './blog.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CreatepostComponent,
    FooterComponent,
    ManagecategoryComponent,
    CategoryComponent,
    SinglepostComponent,
    RootuserComponent,
    DashboardComponent,
    BlogComponent,
    UpdateblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [BlogService,AuthService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
