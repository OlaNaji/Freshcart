import { ProductsComponent } from './../products/products.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ProductsComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,
              private _EcomDataService:EcomDataService,){}

  categories:Category[] = []
  categoriesArray: any[] = [];
  selectedCategory: string = '';

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (param: any)=> {
      this.selectedCategory = param.get('id')
      console.log(this.selectedCategory);
    }
  })

  
  this.displayCategories()
}

  displayCategories():void{
    this._EcomDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data
        this.categoriesArray = response.data.map( (category:any)=> category._id)

        console.log(this.categoriesArray);
      }
    })
  }

  showProducts(category: string) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

}

