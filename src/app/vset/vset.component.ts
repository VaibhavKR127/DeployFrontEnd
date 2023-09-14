import { Component } from '@angular/core';
import { VsetService } from '../vset.service';

@Component({
  selector: 'app-vset',
  templateUrl: './vset.component.html',
  styleUrls: ['./vset.component.css']
})
export class VsetComponent {

  vset: any;
  showForm: boolean = false;
  newvset: any = {};
  selectedvset: any;
  editingvset: boolean = false;
  searchTerm: string = '';


  severity = [
    {id: 1, name: "Critical"},
    {id: 2, name: "High"},
    {id: 3, name: "Medium"},
    {id: 4, name: "Low"},
    {id: 5, name: "Informational"}
 ];

//Not implemented completely refer restcat
filteredvset: any;
  constructor(private vser:VsetService) { }

  ngOnInit() {
    this.getvset();
  }

  getvset(){
    return this.vser.ShowvSet().subscribe(data=>{
     // console.log(data);
      this.vset=data;
    });
  }


  delvset(id:any){
    return this.vser.deletevSet(id).subscribe(data=>{
      //console.log(data);
      this.ngOnInit();
    });
  }


  editvset(vset: any) {
    this.selectedvset = { ...vset };
    this.editingvset = true; // Set editingCategory to true to open the edit form
  }
  updatevset() {
    return this.vser.updatevSet(this.selectedvset).subscribe((data: any) => {
      //console.log(data);
      this.selectedvset = null;
      this.editingvset = false; // Close the form
      this.ngOnInit();
    });
  }
  cancelUpdatevset() {
    this.selectedvset = null;
    this.editingvset = false;
  }


  addvset() {
    this.showForm = true;
  }
  
  addNewvset() {
    console.log(this.newvset);
    return this.vser.AddvSet(this.newvset).subscribe((data: any) => {
      //console.log(data);
      this.newvset = {};
      this.showForm = false; // Hide the form after adding a new category
      this.ngOnInit();
    });
  }
  
  cancelAddvset() {
    this.newvset = {}; // Reset the newcategory object
    this.showForm = false; // Hide the form
  }
}
