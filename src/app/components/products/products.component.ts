import { SearchPipe } from './../../shared/pipes/search.pipe';
import { Component, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //categories
  @Input() category: string = ''; 
  @Input() brand:string = '';
  

  pageChanged(event: any):void {
    this.displayAllProducts(event)
}
  
  constructor(private _CartService: CartService,
    private _EcomDataService: EcomDataService,
    private _WishlistService:WishlistService,
    private _Renderer2: Renderer2,
    private toastr: ToastrService) {}
    

    wishlistArray:string[] = []
    likedProducts:string[] = []
    isInWishlist:boolean = false

    products: Product[] = []
    currentPage:number = 1;
    pageSize:number = 0;
    total:number = 0
    // "numberOfPages": 2,

    searchTerm:string =''
  
    ngOnInit(): void {
    this.displayAllProducts()
    this.displayWishlist()
  }

  
  addToCart(productID: string, cartBtn: HTMLElement): void {
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

  displayAllProducts(pageNumber:number = 1): void {
    this._EcomDataService.getAllProducts(pageNumber, undefined, undefined).subscribe({
      next: (response) => {
        this.products = response.data
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.total = response.results

        console.log(this.products.length);
        
      },
      error: (error) => {
      }
    })
  }


  // wishlist methods
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
  isProductLiked(productId: string): boolean {
    return this.wishlistArray.includes(productId);
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



  
  filterProducts() {
    if (this.category) {
      this._EcomDataService.getAllProducts(1, undefined, this.category).subscribe({
        next: (response) => {
          this.products = response.data
        }
      })
    } else {
      this.products = this.products;
    }
  }

  filterBrands() {
    if (this.brand) {
      this._EcomDataService.getAllProducts(1, this.brand, undefined).subscribe({
        next: (response) => {
          this.products = response.data
        }
      })
    } else {
      this.products = this.products;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['brand'] && changes['brand'].currentValue !== changes['brand'].previousValue) {
      this.filterBrands();
    }
    if (changes['category'] && changes['category'].currentValue !== changes['category'].previousValue) {
      this.filterProducts();
    }
  }
  
  ngOnDestroy(): void {
    //empty the array for other components
    this.products = []
  }
}