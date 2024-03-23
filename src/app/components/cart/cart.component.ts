import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService){}
  cartItem:CartItem | null = null;



  ngOnInit(): void {
      this.getCartItems()
  }
  
  getCartItems():void{
      this._CartService.getCartItems().subscribe({
        next: (response) => {
          this.cartItem = response.data
          console.log(response);
          
          console.log(this.cartItem?._id);
          this._CartService.cartNumber.next(response.numOfCartItems)

          if(this.cartItem?.products?.length == 0){
            this.cartItem = null
          }
        },

        error: (err) => {
          this._CartService.cartNumber.next(0)

        }
      })
  }

  removeCartItem(productID:string):void{
    this._CartService.removeCartItem(productID).subscribe({
      next: (response) => {
        this.cartItem = response.data
        this._CartService.cartNumber.next(response.numOfCartItems)

        if(this.cartItem?.products?.length == 0){
          this.cartItem = null
        }
      }
    })
}
  
  updateQuantity(productID:string, count:number):void{
    if(count >= 1){
      this._CartService.updateQuantity(productID, count).subscribe({
        next: (response) => {
          this.cartItem = response.data     
        }
      })
    }
    else{
      this.removeCartItem(productID)
    }
  }

  clearCart():void{
    this._CartService.clearCart().subscribe({
      next: (response) => {
        this.cartItem = null
        this._CartService.cartNumber.next(response.numOfCartItems)

      }
    })
}

}