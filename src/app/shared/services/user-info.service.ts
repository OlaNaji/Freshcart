import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private _HttpClient:HttpClient) { }

  userInfo:any 

  baseURL:string = 'https://ecommerce.routemisr.com'
  userToken:any = localStorage.getItem('eToken')
 

  updateUserData(userData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/users/updateMe/`, 
                                {userData},
                                {headers: {token: this.userToken}})
  }

  resetLoggedPassword(passwordData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/users/changeMyPassword`, 
                                passwordData,
                                {headers: {token: this.userToken}})
  }


  forgotPassword(email:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords`, 
                                  {email: email})
  }

  verifyResetCode(code:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode`,
                                  {resetCode: code})
  }

  resetForgotPassword(userData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword`, userData)
  }


  getUserID():void{
    const eToken = localStorage.getItem('eToken')
    if(eToken !== null){
      const decode = jwtDecode(eToken)
      this.userInfo = decode
      console.log(decode);
      
    }
  }

  getUserOrders(userID:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${userID}`)
  }
}
