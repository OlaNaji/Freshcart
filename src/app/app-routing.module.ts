import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [{
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/blank-layout/blank-layout.component').then(
      (m) => m.BlankLayoutComponent
    ),
    children: [{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(
          (m) => m.HomeComponent
        ),
        title: 'home'
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(
          (m) => m.CartComponent
        ),
        title: 'cart'
      },
      {
        path: 'brands/:id',
        loadComponent: () => import('./components/brands/brands.component').then(
          (m) => m.BrandsComponent
        ),
        title: 'brands'
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(
          (m) => m.BrandsComponent
        ),
        title: 'brands'
      },
      {
        path: 'categories/:id',
        loadComponent: () => import('./components/categories/categories.component').then(
          (m) => m.CategoriesComponent
        ),
        title: 'categories'
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(
          (m) => m.CategoriesComponent
        ),
        title: 'categories'
      },
      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(
          (m) => m.ProductsComponent
        ),
        title: 'products'
      },
      {
        path: 'payment/:cartID',
        loadComponent: () => import('./components/payment/payment.component').then(
          (m) => m.PaymentComponent
        ),
        title: 'payment'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(
          (m) => m.DetailsComponent
        ),
        title: ':title'
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist/wishlist.component').then(
          (m) => m.WishlistComponent
        ),
        title: 'wishlist'
      },
      {
        path: 'profile/resetPassword',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(
          (m) => m.ResetPasswordComponent
        ),
        title: 'reset password'
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(
          (m) => m.ProfileComponent
        ),
        title: 'profile'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/profile/profile.component').then(
          (m) => m.ProfileComponent
        ),
        title: 'profile'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(
          (m) => m.DetailsComponent
        ),
        title: ':title'
      },
    ]
  },

  {
    path: '',
    loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(
      (m) => m.AuthLayoutComponent
    ),
    children: [{
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(
          (m) => m.RegisterComponent
        ),
        title: 'register'
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(
          (m) => m.LoginComponent
        ),
        title: 'login'
      },
      {
        path: 'resetPassword',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(
          (m) => m.ResetPasswordComponent
        ),
        title: 'reset password'
      },    
    ]
  },

  {
    path: 'footer',
    loadComponent: () => import('./components/footer/footer.component').then(
      (m) => m.FooterComponent
    ),
    title: 'footer'
  },      
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(
      (m) => m.NotFoundComponent
    ),
    title: 'notFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
