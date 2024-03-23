import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/interfaces/category';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ToastrModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlistArray:string[] = []
  isInWishlist:boolean = false
  cartNumber:number = 0
  products:Product[] = []
  categories:Category[] = []
  likedProducts:string[] = []


  constructor(private _WishlistService:WishlistService,
              private _CartService:CartService,
              private _Renderer2:Renderer2,
              private toastr: ToastrService){}

  ngOnInit(): void {
      this.displayWishlist()
  }




  addToWishlist(productID:string){
    if(this.isProductLiked(productID)){
      console.log(productID);
      
      this._WishlistService.removeFromWishlist(productID).subscribe({
        next: (response) => {
          console.log(response.data);
          this.wishlistArray = response.data
          this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)
          this.displayWishlist()
        }
      })
    } else {
      this._WishlistService.addToWishlist(productID).subscribe({
        next: (response) => {
          console.log(response.data);
          this.wishlistArray = response.data
          this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)
        }
      })
    }
  }

  displayWishlist():void{
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        this.products = response.data
        this.likedProducts = response.data.map( (product:any)=> product._id)
        this.wishlistArray = this.likedProducts
        this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  isProductLiked(productId: string): boolean {
    return this.wishlistArray.includes(productId);
  }


  addToCart(productID:string, cartBtn:HTMLElement):void{
    //disable button until request
    this._Renderer2.setAttribute(cartBtn, 'disabled', 'true')

    this._CartService.addToCart(productID).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.message)
        this._Renderer2.removeAttribute(cartBtn, 'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems)
      },

      error: (err) => {
        this._Renderer2.removeAttribute(cartBtn, 'disabled')
      }
    })
  }
}