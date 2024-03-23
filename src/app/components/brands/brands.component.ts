import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { brand } from 'src/app/shared/interfaces/category';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive, CarouselModule, ProductsComponent],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute,
    private _EcomDataService:EcomDataService,){
  }

  brands:brand[] = []
  brandsArray:string[] = []
  selectedBrand:string = ''


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param: any)=> {
        this.selectedBrand = param.get('id')
        this.selectBrand(this.selectedBrand)
      }
    })
    this.displayBrands()
  }

  displayBrands():void{
      this._EcomDataService.getAllBrandss().subscribe({
        next: (response:any ) => {
          console.log(response);
          this.brands = response.data;
          this.brandsArray = response.data.map( (brand:any)=> brand._id)
          console.log(this.brandsArray);
          
        }
      })
  }

  selectBrand(brandID:string){
    this.selectedBrand = brandID;
    console.log(this.selectedBrand);
    
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
    responsive: {
      0: {
        items: 4
      },
      525: {
        items: 7
      },
      767: {
        items: 10
      },
      1020: {
        items: 10
      }
    },
    nav: false,
  }
  brandsCarousel_2: OwlOptions = {
    loop: true,
    // mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      525: {
        items: 7
      },
      767: {
        items: 10
      },
      1020: {
        items: 10
      }
    },
    nav: true,
  }
}