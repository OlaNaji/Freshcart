import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://route-ecommerce.onrender.com/'
  userToken:any = localStorage.getItem('eToken')
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0)


  addToCart(productID:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart', 
                                  {productId: productID}               //takes body as a object
                                  )   //takes headers and token as a object
  }

  getCartItems():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',
                                )
  }

  removeCartItem(productID:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}api/v1/cart/${productID}`,
                                )
  }

  updateQuantity(productID:string, count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}api/v1/cart/${productID}`,
                                {count: count},
                                )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}api/v1/cart/`,
                                )
  }

  cashOrder(cartID:string, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
                            {shippingAddress : shippingDetails},
                            
    )
  }

  onlineOrder(cartID:string, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://freshcart-opal.vercel.app/`,
                            {shippingAddress : shippingDetails},
                            
    )
  }
}
