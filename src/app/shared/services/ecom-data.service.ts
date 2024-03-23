import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomDataService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://route-ecommerce.onrender.com/'

  getAllProducts(pageNumber: number = 1, brandId?: string, categoryId?: string):Observable<any>{
    // return this._HttpClient.get(`${this.baseUrl}api/v1/products`+`?page=${pageNumber}`) 
    let url = `${this.baseUrl}api/v1/products?page=${pageNumber}`;

    if (brandId !== undefined) {
      url += `&brand=${brandId}`;
    }

    if (categoryId !== undefined) {
      url += `&category=${categoryId}`;
    }

    return this._HttpClient.get(url);
  
  }

  getSpecificProduct(productID:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}api/v1/products/${productID}`)
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}api/v1/categories`)
  }

  getAllBrandss():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}api/v1/brands`)
  }
}
