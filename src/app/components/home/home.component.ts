import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/interfaces/category';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, CarouselModule, HttpClientModule, ToastrModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _EcomDataService:EcomDataService,
              private _CartService:CartService,
              private _WishlistService:WishlistService,
              private _Renderer2:Renderer2,
              private toastr: ToastrService){}

  cartNumber:number = 0
  products:Product[] = []
  categories:Category[] = []
  wishlistArray:string[] = []
  likedProducts:string[] = []
  isInWishlist:boolean = false

    ngOnInit(): void {
      this.displayAllProducts()
      this.displayCategories()
      this.displayWishlist()
    }

    displayAllProducts():void{
      this._EcomDataService.getAllProducts().subscribe({
        next: (response) =>{
            this.products = response.data            
        },
        error: (error) => {

        }

      })
    }

    displayCategories():void{
      this._EcomDataService.getAllCategories().subscribe({
        next: (response) => {
          this.categories = response.data
          console.log(this.categories);
          
        },
        error: (err) => {console.log(err);
        }
      })
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

    addToWishlist(productID:string){
      if(this.isProductLiked(productID)){
        console.log("wisshshshshs");
        
        this._WishlistService.removeFromWishlist(productID).subscribe({
          next: (response) => {
            console.log(response.data);
            this.wishlistArray = response.data
          this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)

          },
          
        error: (err) => {console.log(err);
        }
        })
      } else {
        this._WishlistService.addToWishlist(productID).subscribe({
          next: (response) => {
            console.log(response.data);
            this.wishlistArray = response.data
          this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)

          },
          
          error: (err) => {console.log(err)}
        })
      }
    }

    displayWishlist():void{
      this._WishlistService.getWishlist().subscribe({
        next: (response) => {
          this.likedProducts = response.data.map( (product:any)=> product._id)
          this.wishlistArray = this.likedProducts
          this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)
          console.log(this.likedProducts);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    isProductLiked(productId: string): boolean {
      return this.wishlistArray.includes(productId);
    }


    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      autoplay: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        }
      }
    }
    categoryOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0:{
          items:2
        },
        525: {
          items: 3
        },
        740: {
          items: 5
        },
        1020: {
          items: 6
        }
      },
      nav: true,
    }
    
}