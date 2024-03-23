import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MyhttpInterceptor } from './shared/interceptors/myhttp.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    DescriptionPipe,
    SearchPipe,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
