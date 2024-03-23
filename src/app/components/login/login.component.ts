import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}

  errorMessage:string = ''
  isLoading:boolean = false

  loginForm: FormGroup =  new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
  })

  setLoginForm():void{
    if(this.loginForm.valid){
      this.isLoading =  true;
    }

    this._AuthService.signinAPI(this.loginForm.value).subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          console.log(response);
          localStorage.setItem('eToken', response.token)
          this._Router.navigate(['/home'])
          this.isLoading =  false;
        }
      },

      error: (error)=>{
        this.errorMessage = error.error.message
        this.isLoading =  false;
        console.log(error);
      }
    })
    console.log(this.loginForm.value)
  }


}
