import { Component } from '@angular/core';
import { AddCompserService } from '../add-compser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  newcompany: any = {};
  showForm: boolean = false;

constructor(private addcompserv:AddCompserService, private router: Router){}

  ngOnInit(): void {
    
  }

  addcompany(){
    this.showForm = false;
  }
  addNewCompany(){
    return this.addcompserv.AddCompany(this.newcompany).subscribe((data:any)=>
    {
      //console.log(data);
      this.newcompany={};
      this.router.navigate(['/show-company']);
      this.ngOnInit();
      
    })
  }

  cancelAddCompany() {
    this.newcompany = {}; // Reset the newcategory object
    this.showForm = false; // Hide the form
  }
 
}
