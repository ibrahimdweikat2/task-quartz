import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddToTableComponent } from '../components/add-to-table/add-to-table.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'add-to-table',component:AddToTableComponent},
  {path:'edit-table/:id',component:AddToTableComponent}
];
