import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ToastrModule, NgOtpInputModule , ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  constructor(private _FormBuilder:FormBuilder,
              private _Router:Router,
              private toastr: ToastrService,
              private _UserInfoService:UserInfoService){}

  isLoading:boolean = false
  isReset:boolean = true
  emailSent:boolean = false
  isCodeFull:boolean = false
  codeSuccess:boolean = false
  resetCode:string = ''

  ngOnInit(): void {
      if(localStorage.getItem('eToken') === null){
        this.isReset = false
      }
  }


  // HANDLE FORM AND VALIDATION
  resetPasswordForm:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    oldPassword: [''],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
    rePassword: [''],
    resetCode: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
  }, {validators: [ this.confirmPassword]})

  confirmPassword(form:FormGroup):void{
    let password = form.get('password')
    let rePassword = form.get('rePassword')
    
    if(rePassword?.value == ''){
      rePassword?.setErrors({required: true})
    }

    if(password?.value !== rePassword?.value){
      rePassword?.setErrors({mismatch: true})
    }

  }


  //-----------------------------------------------//
  resetPassword():void{
    const passwordData = {
    currentPassword:String = this.resetPasswordForm.get('oldPassword')?.value, 
    password:String = this.resetPasswordForm.get('password')?.value,
    rePassword:String = this.resetPasswordForm.get('rePassword')?.value
  };

    console.log(passwordData);
    
    this._UserInfoService.resetLoggedPassword(passwordData).subscribe({
      next: (response) => { 
        console.log(response);
        this.toastr.show('Password updated successfully, please log in again')
        localStorage.removeItem('eToken')
      },
      error: (err) => {console.log(err);
        this.toastr.show(err.message)

      }
    })
  }

  sendCode():void{
    this.emailSent = true

    this._UserInfoService.forgotPassword(this.resetPasswordForm.get('email')?.value).subscribe({
      next: (response) => { 
        console.log(response);
      },
      error: (err) => {console.log(err)}
    })
  }

  resetForgotPassword():void{
    if(this.codeSuccess){
      const userData = {
        email:String = this.resetPasswordForm.get('email')?.value,
        newPassword:String = this.resetPasswordForm.get('password')?.value,
      }

      console.log(userData);
      
      this._UserInfoService.resetForgotPassword(userData).subscribe({
        next: (response) => {console.log(response);
        }
      })
    }
    else{
      this.emailSent = true
      console.log(this.resetCode);

      this._UserInfoService.verifyResetCode(this.resetCode).subscribe({
        next: (response) => { 
          if(response.status === "Success"){
            this.codeSuccess = true
          }
        },
      })
    }
  }


  onOtpChange($event: string) {
    if($event.length == 6){
      console.log($event);
      this.isCodeFull = true
      this.resetCode = $event;
    }
  }
}