import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if( localStorage.getItem('eToken') !== null){
      const myToken:any = { token: localStorage.getItem('eToken') }
      
      request = request.clone({
        setHeaders: myToken
      })
    }

    this.spinner.show()   
    return next.handle(request).pipe( finalize( ()=>{this.spinner.hide()} ));
  }
}
