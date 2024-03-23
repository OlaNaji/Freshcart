import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavbarBlankComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {

}
