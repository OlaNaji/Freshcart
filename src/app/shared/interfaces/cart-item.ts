import {
    Product
  } from "./product"
  
  export interface CartItem {
    _id:string
    products?: any[]
    totalCartPrice?: number
  }
  
  