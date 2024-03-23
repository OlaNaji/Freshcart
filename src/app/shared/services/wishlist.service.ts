import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL:string = 'https://ecommerce.routemisr.com'
  userToken:any = localStorage.getItem('eToken')
  numOfWishlistItems: BehaviorSubject<number> = new BehaviorSubject(0)

  addToWishlist(productID:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`, 
                                {productId: productID},
                                {headers: {token: this.userToken}})
  }

  removeFromWishlist(productID:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${productID}`, 
                                {headers: {token: this.userToken}})
  }

  getWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`,
                                {headers: {token: this.userToken}})
  }
}
