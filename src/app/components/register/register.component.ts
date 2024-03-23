import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder){}

    // userData:UserData = {} as UserData
    errorMessage:string = ''
    isLoading:boolean = false

    registerForm: FormGroup = this._FormBuilder.group({
      name: ["",[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
      rePassword: [""],
      phone: ["", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    }, {validators: [this.confirmPassword]})


    setRegisterForm():void{
      if(this.registerForm.valid){
        this.isLoading =  true;     
      }

      this._AuthService.signupAPI(this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
            this._Router.navigate(['/login'])
            this.isLoading =  false;
          }
        },

        error: (error)=>{
          this.errorMessage = error.error.message
          this.isLoading =  false;
          console.log(error);
        }
      })
      console.log(this.registerForm.value)
    }


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
}