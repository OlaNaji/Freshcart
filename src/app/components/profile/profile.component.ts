import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { order, UserData } from 'src/app/shared/interfaces/user-data';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private _UserInfoService: UserInfoService) {}

  orderData:order[] = []
  userData:UserData = {} as UserData
  userID:any 


  editForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  })
  
  ngOnInit(): void {
    
          this._UserInfoService.getUserID()
          this.userID = this._UserInfoService.userInfo.id
          console.log(this.userID);

    this._UserInfoService.getUserOrders(this.userID).subscribe({
        next: (response)=> {
          if(response.length != 0){
          this.orderData = response
          this.userData = this.orderData[0].user
          console.log(response);
          
          // this.userOrder = response
        } else{
          this.userData = {name: '', phone: '', email: '', password:'', addresses:[{}], orders:[{}]}
        }
        },
      })
      
  }

  name: string = ''  
  email: string = ''
  phone: string = ''

  editing = false;
  isResetPassword:boolean = false

  startEditing() {
    this.editing = true;
  }

  stopEditing() {
    this.editing = false;
  }

  saveEdit() {
    this.name = this.editForm.get('name') ?.value;
    this.email = this.editForm.get('email') ?.value;
    this.phone = this.editForm.get('phone') ?.value;

    console.log(this.editForm.value);
    
    this._UserInfoService.updateUserData(this.editForm.value).subscribe({
      next: (response) => {console.log(response);
      }
    })


    this.editing = false; // Exit editing mode
  }

  resetPassword():void{
    this.isResetPassword = true
  }

 
}