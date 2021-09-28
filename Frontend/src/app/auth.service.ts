import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  //signup
  newUser(user:any){
    return this.http.post("http://localhost:8000/signup",user)
  }
//login
  loginUser(user:any){
    return this.http.post<any>("http://localhost:8000/login",user)
  }


  getRootuser()
  {
    return localStorage.getItem('rootuser')
  }


}

