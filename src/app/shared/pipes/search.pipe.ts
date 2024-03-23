import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], searchTerm:String):Product[] {
    return products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
