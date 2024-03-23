import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/interfaces/category';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { DescriptionPipe } from 'src/app/shared/pipes/description.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, DescriptionPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private _EcomDataService:EcomDataService,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private toastr: ToastrService){}

  productDetails:Product = {} as Product
  cartNumber:number = 0
  products:Product[] = []
  categories:Category[] = []
  wishlistArray:string[] = []
  likedProducts:string[] = []
  isInWishlist:boolean = false
  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next: (param: any) => {
          let productID:string = param.get('id')
          this.getPRoductDetails(productID)
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
      this._WishlistService.removeFromWishlist(productID).subscribe({
        next: (response) => {
          console.log(response.data);
          this.wishlistArray = response.data
        this._WishlistService.numOfWishlistItems.next(this.wishlistArray.length)

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

  getPRoductDetails(productID:string):void{
    this._EcomDataService.getSpecificProduct(productID).subscribe({
      next: (response) => {
        this.productDetails = response.data
        console.log(this.productDetails);
        
      }


    })
  }

  


  brandsCarousel_1: OwlOptions = {
    loop: true,
    // mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  }
}

