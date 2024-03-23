import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  constructor(private _FormBuilder:FormBuilder, 
              private _CartService:CartService,
              private _Router:Router,
              private _ActivatedRoute:ActivatedRoute){}

  details:string = ''
  showForm: boolean = true
  cartID:string = ''
  cities: string[] = [
    'Alexandria',
    'Aswan',
    'Asyut',
    'Beheira',
    'Beni Suef',
    'Cairo',
    'Dakahlia',
    'Damietta',
    'Faiyum',
    'Gharbia',
    'Giza',
    'Ismailia',
    'Kafr El Sheikh',
    'Luxor',
    'Matrouh',
    'Minya',
    'Monufia',
    'New Valley',
    'North Sinai',
    'Port Said',
    'Qalyubia',
    'Qena',
    'Red Sea',
    'Sharqia',
    'Sohag',
    'South Sinai',
    'Suez'
  ];

  paymentForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required]],
    email:[null, [Validators.required, Validators.email]],
    country:['Egypt'],
    city:[null, [Validators.required]],
    streetAddress:[null, [Validators.required]],
    floorNum:[null, [Validators.required]],
    BuildingNum:[null, [Validators.required]],
    aptNum:[null, [Validators.required]],
    phoneNum:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    paymentMethod:[null, [Validators.required]]
  })
  

  //get the cartID from the URL
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param: any) => {
        this.cartID = param.get('cartID')
        // console.log(productID);
      }
    })

  }
  

  submitPayment():void{
    this.details += `
      name: ${this.paymentForm.get('name')?.value},
      email: ${this.paymentForm.get('email')?.value},
      country: ${this.paymentForm.get('country')?.value},
      street Address: ${this.paymentForm.get('streetAddress')?.value},
      floor Number: ${this.paymentForm.get('floorNum')?.value},
      Building Numbe: ${this.paymentForm.get('BuildingNum')?.value},
      apt Number: ${this.paymentForm.get('aptNum')?.value},    
    `

    let shippingAddress:object = {
      details: this.details,
      phone: this.paymentForm.get('phoneNum')?.value,
      city: this.paymentForm.get('city')?.value
    }

    console.log(shippingAddress);
    

    if (this.paymentForm.get('paymentMethod')?.value === 'online') {
      this._CartService.onlineOrder(this.cartID, shippingAddress).subscribe({
        next: (response)=> {
          window.open(response.session.url, '_self')
          this._CartService.cartNumber.next(0)

          console.log(response);
        }
      })
    } else if (this.paymentForm.get('paymentMethod')?.value === 'cash') {
      this._CartService.cashOrder(this.cartID, shippingAddress).subscribe({
        next: (response)=> {
          this._CartService.cartNumber.next(0)
          this._Router.navigate(['/home'])
          
          console.log(response);
        }
      })
    }
    console.log(this.paymentForm.value);
  }

}