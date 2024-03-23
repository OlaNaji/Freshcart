import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, brand } from 'src/app/shared/interfaces/category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService, 
              private _WishlistService:WishlistService,
              private _CartService:CartService,
              private _EcomDataService:EcomDataService,
              private _Renderer2:Renderer2){ }
  
  cartNumber:number = 0
  wishlistItems:number = 0
  categories:Category[] = []
  brands:brand[] = []



@ViewChild('navBar') navElement!:ElementRef
@HostListener('window:scroll')
onScroll():void{
  if(scrollY > 300){
    this._Renderer2.addClass(this.navElement.nativeElement, 'px-4')
    this._Renderer2.addClass(this.navElement.nativeElement, 'shadow-sm')
  } else{
    this._Renderer2.removeClass(this.navElement.nativeElement, 'px-4')
    this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow-sm')
  }
}

  ngOnInit(): void {
      this._CartService.cartNumber.subscribe({
        next: (data)=>{
          this.cartNumber = data
        }
      })

      this._WishlistService.numOfWishlistItems.subscribe({
        next: (data)=>{
          this.wishlistItems = data
        }
      })

      this._CartService.getCartItems().subscribe({
        next: (response)=>{
          this.cartNumber = response.numOfCartItems
        },
        error: (err) => {
          this.cartNumber = 0

        }
      })

      this.displayCategories()
      this.displayBrands()
  }

  logout():void{
    this._AuthService.logOutUser()
  }

  displayCategories():void{
    this._EcomDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data
        console.log(this.categories);
      }
    })
  }

  displayBrands():void{
    this._EcomDataService.getAllBrandss().subscribe({
      next: (response) => {
        this.brands = response.data
        console.log(this.brands);
      }
    })
  }


// dropdown hover
  isDropdownOpen: boolean = false;
  isBrandsDropdownOpen: boolean = false;

  showDropdownMenu() {
    this.isDropdownOpen = true;
  }

  hideDropdownMenu() {
    this.isDropdownOpen = false;
  }
  showBrandsDropdownMenu() {
    this.isBrandsDropdownOpen = true;
  }

  hideBrandsDropdownMenu() {
    this.isBrandsDropdownOpen = false;
  }
}
