import { Component } from '@angular/core';
import { SerTypeService } from '../ser-type.service';
import { authguardGuard } from '../authguard.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent {

  services: any;
  showForm: boolean = false;
  newservice: any = {};
  selectedService: any;
  editingService: boolean = false;
  searchTerm: string = '';
//Not implemented completely refer restcat
  filteredServices: any;
  constructor(private sTser:SerTypeService,private auth:AuthService) { }

  ngOnInit() {
    this.getServices();
    //this.auth.setuser();
  }

  getServices(){
    return this.sTser.ShowServices().subscribe(data=>{
      //console.log(data);
      this.services=data;
    });
  }


  delService(id:any){
    return this.sTser.deleteService(id).subscribe(data=>{
      //console.log(data);
      this.ngOnInit();
    });
  }


  editService(service: any) {
    this.selectedService = { ...service };
    this.editingService = true; // Set editingCategory to true to open the edit form
  }
  updateService() {
    return this.sTser.updateService(this.selectedService).subscribe((data: any) => {
      //console.log(data);
      this.selectedService = null;
      this.editingService = false; // Close the form
      this.ngOnInit();
    });
  }
  cancelUpdateService() {
    this.selectedService = null;
    this.editingService = false;
  }


  addService() {
    this.showForm = true;
  }
  
  addNewService() {
    return this.sTser.AddService(this.newservice).subscribe((data: any) => {
      //console.log(data);
      this.newservice = {};
      this.showForm = false; // Hide the form after adding a new category
      this.ngOnInit();
    });
  }
  
  cancelAddService() {
    this.newservice = {}; // Reset the newcategory object
    this.showForm = false; // Hide the form
  }
  
}
