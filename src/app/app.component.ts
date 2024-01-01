import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { AddToTableComponent } from '../components/add-to-table/add-to-table.component';
import { TableComponent } from '../components/table/table.component';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent,AddToTableComponent,TableComponent,ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'a';
}
