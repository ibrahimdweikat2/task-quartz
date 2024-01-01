import { Component,OnInit,Output } from '@angular/core';
import { Table, TableComponent } from '../table/table.component';
import { MaxWidthWrapperComponent } from '../max-width-wrapper/max-width-wrapper.component';
import { IndexDBService } from '../../shared/service/index-db.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpinnerComponent,TableComponent,MaxWidthWrapperComponent,CommonModule],
  providers:[IndexDBService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  item:Table[]=[]
  loading:boolean = false;
  @Output() data:Table[]=this.item
  constructor(private indexDB: IndexDBService){

  }

   ngOnInit(): void {
    this.getAllData();
  }

  async getAllData(){
    this.loading=true;
    const data: Table[] = await this.indexDB.getAllData();

    this.item = data;
    this.loading=false;
    }
}
