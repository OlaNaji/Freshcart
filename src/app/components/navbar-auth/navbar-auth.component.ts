import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-auth.component.html',
  styleUrls: ['./navbar-auth.component.css']
})
export class NavbarAuthComponent {

}
