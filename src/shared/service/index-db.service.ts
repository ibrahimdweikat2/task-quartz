import { Injectable } from '@angular/core';
import { openDB,IDBPDatabase} from 'idb';
import { Table } from '../../components/table/table.component';
@Injectable({
  providedIn: 'root'
})
export class IndexDBService {
  private db: Promise<IDBPDatabase>;
  constructor() {
    this.db=openDB('TableDB',1,{
      upgrade(db){
        if(!db.objectStoreNames.contains('Table')){
          const objectStore=db.createObjectStore('Table',{keyPath:'id',autoIncrement:true})

          objectStore.createIndex('TableIndex','id',{unique:true})
        }
      }
    })
   }

   async addData(data:any):Promise<void>{
    const DB=await this.db;
    const transaction=DB.transaction('Table','readwrite')
    const objectStore=transaction.objectStore('Table');

    await objectStore.add(data);
    await transaction.done;
   }

   async getAllData():Promise<any>{
    const DB=await this.db;
    const transaction=DB.transaction('Table','readonly')
    const objectStore=transaction.objectStore('Table');

    return await objectStore.getAll();
   }

   async deleteItemById(id:number):Promise<void>{
    const DB=await this.db;
    const transaction=DB.transaction('Table','readwrite')
    const objectStore=transaction.objectStore('Table');

    await objectStore.delete(id)
    await transaction.done;
   }

   async getItemByID(id:number):Promise<any>{
    const DB=await this.db;
    const transaction=DB.transaction('Table','readwrite')
    const objectStore=transaction.objectStore('Table');
    const index=objectStore.index('TableIndex')

    return index.get(id);
   }

   async updateItem(item:Table):Promise<void>{
    const DB=await this.db;
    const transaction=DB.transaction('Table','readwrite')
    const objectStore=transaction.objectStore('Table');

    await objectStore.put(item);

    await transaction.done;
   }
}
