import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexDBService } from '../../shared/service/index-db.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MaxWidthWrapperComponent } from '../max-width-wrapper/max-width-wrapper.component';


@Component({
  selector: 'add-to-table',
  standalone: true,
  imports: [SpinnerComponent,CommonModule,IconsComponent,FormsModule,
    ReactiveFormsModule,HlmInputDirective,HlmButtonDirective,HlmLabelDirective
    ,MaxWidthWrapperComponent],
  templateUrl: './add-to-table.component.html',
  styleUrl: './add-to-table.component.css',
})
export class AddToTableComponent{
  firstName:string ='';
  lastName:string='';
  Age:number= 0;
  fullName:string='';
  id:string='0'
  loading:boolean=false

  constructor(private indexDB: IndexDBService,private router:ActivatedRoute){
    this.router.params.subscribe(param=>{
      this.id=param['id']
    })
    if(this.id !== '0'){
      this.getItem(this.id);
    }
  }


  async getItem(id:string){
    const idItem:number = parseInt(id);
    const item:Table=await this.indexDB.getItemByID(idItem);
    this.firstName=item.firstName;
    this.lastName=item.lastName;
    this.Age=item.Age
  }


  async submits(){
    if(this.firstName.length > 0 && this.lastName.length > 0 && this.Age > 0 ){
      console.log(this.id)
      if(this.id === undefined){
        this.loading=true;
        this.fullName=this.firstName+' '+ this.lastName
        const data={
          firstName:this.firstName,
          lastName:this.lastName,
          finalName:this.fullName,
          Age:this.Age
        }
        await this.indexDB.addData(data);
        console.log('Add Successfully')
        this.firstName=''
        this.lastName=''
        this.fullName=''
        this.Age=0
        this.loading=false;
      }else{
        this.loading=true;
        this.fullName=this.firstName+' '+ this.lastName
        const id:number=parseInt(this.id)
        const data:Table={
          id:id,
          firstName:this.firstName,
          lastName:this.lastName,
          finalName:this.fullName,
          Age:this.Age
        }

        await this.indexDB.updateItem(data);
        this.firstName=''
        this.lastName=''
        this.fullName=''
        this.Age=0
        this.loading=false;
      }

    }
  }
}
