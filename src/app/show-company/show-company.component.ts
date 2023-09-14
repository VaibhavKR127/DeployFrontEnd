import { Component,OnInit } from '@angular/core';
import { AddCompserService } from '../add-compser.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent  implements OnInit{

  companies: any;
  showForm: boolean = false;
  newcompany: any = {};
  selectedCompany: any;
  editingCompany: boolean = false;
  searchTerm: string = '';
//Not implemented completely refer restcat
  constructor(private compser:AddCompserService,private route:Router) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    return this.compser.ShowCompanies().subscribe(data=>{
      //console.log(data);
      this.companies=data;

    });
  }


  delCompany(id:any){
    return this.compser.deleteCompany(id).subscribe(data=>{
      //console.log(data);
      this.ngOnInit();
    });
  }


  editCompany(company: any) {
    this.selectedCompany = { ...company };
    this.editingCompany = true; // Set editingCategory to true to open the edit form
  }
  updateCompany() {
    return this.compser.updateCompany(this.selectedCompany).subscribe((data: any) => {
      //console.log(data);
      this.selectedCompany = null;
      this.editingCompany = false; // Close the form
      this.ngOnInit();
    });
  }
  cancelUpdateCompany() {
    this.selectedCompany = null;
    this.editingCompany = false;
  }

  addcomp(){
    this.route.navigate(["/add-company"]);
  }
  
}
