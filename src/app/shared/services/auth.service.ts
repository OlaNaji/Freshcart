import { UserData } from './../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
  baseUrl:string = 'https://route-ecommerce.onrender.com/'

  logOutUser():void{
    localStorage.removeItem('eToken')
    this._Router.navigate(['/login'])
  }

  signupAPI(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/signup`, userData)
  }

  signinAPI(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/signin`, userData)

  }
}
