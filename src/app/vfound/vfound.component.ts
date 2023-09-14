import { Component } from '@angular/core';
import { VfoundService } from '../vfound.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VsetService } from '../vset.service';
import { DropdownModule } from 'primeng/dropdown';
import { DomSanitizer } from '@angular/platform-browser';
import { vulfound } from '../vulfound.model';
import { pocdes } from '../pocdes.model';
import { FileHandle } from '../file-handle';
import { NgForm } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vfound',
  templateUrl: './vfound.component.html',
  styleUrls: ['./vfound.component.css']
})
export class VfoundComponent {

  newvul: any={};
  curuser:any={};
  Vulnlist:any={};
  
  isnewvul=true;
  showForm: boolean = false;
  selectedVul:any={};
  user:any={};

  id:any;
  tfid: number =10;

  filteredVul: vulfound = {
    tid: 0,
    vfid: 0,
    uid:0,
    vfname: '',
    status: '',
    affectedurls: '',
    description: '',
    remediation: '',
    severity: '',
    vreferences: '',
    poc: [],
    pocdes: []
  };

  status = [
    {id: 1, name: "Open"},
    {id: 2, name: "Closed"},
    
 ];
 selectedsev = "";




  //count:any=this.filteredVul.pocdes.length+1;
 // newtest: any;
copoc:any=[];
m=1;
j:number=0;
constructor(private vfser:VfoundService,private vser:VsetService, private router: Router,private activatedRoute:ActivatedRoute,private sanit:DomSanitizer,private auth:AuthService){}

  ngOnInit(): void {
    this.id=localStorage.getItem("tfid");
    this.tfid= JSON.parse(this.id);
    
    this.user=localStorage.getItem("curuser");
    this.curuser=JSON.parse(this.user);
    console.log(this.curuser);

    this.counter();
    this.filteredVul= this.activatedRoute.snapshot.data['vfound']
    //console.log(this.activatedRoute.snapshot.data['vfound'],"Snapshot")
   this.getPdesc();
    this.getVulist();
   
    //console.log();
    if(this.filteredVul && this.filteredVul.vfid){
      this.isnewvul=false;
    }
    this.copoc.push(this.filteredVul.pocdes);
  }




  counter(){
    for(let i=0;i<30;i++){
      this.copoc.push(i);
    }
  }

  getPdesc(){
    if(this.newvul){
      const pdesc:any[]=[];
      let vuln :any={};
      this.vfser.vSfoundwithpd(this.filteredVul.vfid).subscribe((data:any)=>
      {
        vuln = data;
        //console.log(vuln,"hello");
      }) 
    }
  }

  onselected(data:any){
    this.newvul=data.value;
    this.filteredVul.tid=this.tfid;
    //console.log("Hey ther",this.filteredVul.tid);
    //this.filteredVul.tid=this.newvul.tid;
    this.filteredVul.vfname=this.newvul.vfname;
    this.filteredVul.description=this.newvul.description;
    this.filteredVul.vreferences=this.newvul.references;
    this.filteredVul.severity=this.newvul.severity;
    this.filteredVul.uid=this.curuser.uid;
    //console.log(this.curuser.uid);
   // console.log("test",this.filteredVul);
  }
  getVulist(){
    return this.vser.ShowvSet().subscribe((data:any)=>{
    //console.log(data);
    this.Vulnlist=data;
  });
  }
  addVul(){
    this.showForm = false;
  }






  addNewVul(testForm:NgForm){
   // console.log(this.filteredVul);
    //console.log((this.filteredVul.pocdes));
   // this.filteredVul.severity= this.selectedsev;
    const testFormData = this.prepareFormData(this.filteredVul);
    //console.log(testFormData.getAll('pocdes'),"test");
    this.vfser.Addvfound(testFormData).subscribe((data:any)=>
    {
      //console.log(data);
      testForm.reset();
      this.filteredVul.poc=[];
     // this.ngOnInit();

    })
    this.router.navigate(['/testlist']);
   // console.log(this.newtest);
   }

prepareFormData(vfound: vulfound):FormData{
  const formData = new FormData();

  formData.append('vfound',
  new Blob([JSON.stringify(vfound)],{type:'application/json'}));

  for(var i = 0;i<vfound.poc.length;i++){
    formData.append(
      'imgfile',
      vfound.poc[i].file,
      vfound.poc[i].file.name,
      //vfound.pocdes[i]
    );
    }
        formData.append('pocdes',
          new Blob([JSON.stringify(vfound.pocdes)],{type:'application/json'}));
  return formData;
}
    

  cancelAddVul() {
    this.router.navigate(["testlist"]);
  }
 
  onFileSelected(event:any){
    this.filteredVul.pocdes.push(" ");
    if(event.target.files){
      const file = event.target.files[0];
    
      this.m++;
      const fileHandle: FileHandle ={
        file: file,
        url:  this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      
      this.filteredVul.poc.push(fileHandle);
      //console.log(this.filteredVul.poc)
    }
  }
  removeImg(i:any){
    this.filteredVul.poc.splice(i,1);
  }


  fileDropped(fileHandle: FileHandle) {
    this.filteredVul.poc.push(fileHandle);
    this.filteredVul.pocdes.push()
  }

}
















  // addNewVul(vulForm:NgForm){
  //   console.log(this.filteredVul)
  //   const vulFormData = this.prepareFormData(this.filteredVul);
  //   console.log(this.filteredVul)
  //   return this.vfser.Addvfound(vulFormData).subscribe((data:any)=>
  //   {
  //     console.log(data);
  //     vulForm.reset();
  //     this.filteredVul.poc=[];
  //     //this.ngOnInit();

  //   })

  // }

  // prepareFormData(vfound: vulfound):FormData{
  //   const formData = new FormData();
  
  //   formData.append('vfound',
  //   new Blob([JSON.stringify(vfound)],{type:'application/json'}));
  
  //   for(var i = 0;i<vfound.poc.length;i++){
  //     formData.append(
  //       'imgfile',
  //       vfound.poc[i].file,
  //       vfound.poc[i].file.name
  //     );
  
      
  //   }return formData;
  // }

  // cancelAddVul() {
  // //  this.newvul = {}; // Reset the newcategory object
  //   this.showForm = false; // Hide the form
  // }

  // filterVulnerability() {
  //   if (this.selectedVul) {
  //     this.newvul = this.Vulnlist.find((vul: any) => vul.vid == this.selectedVul);
  //     //this.filteredVul=this.newvul;
  //   } else {
  //     //this.filteredVul = this.Vulnlist;
  //   }
  //   console.log("hello", this.filteredVul);
  // }
  // //this.selectedVul,,this.newvul this.filteredVul
 
  // onFileSelected(event:any){
  //   if(event.target.files){
  //     const file = event.target.files[0];


  //     const fileHandle: FileHandle ={
  //       file: file,
  //       url: this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
  //     }
  //     this.filteredVul.poc=[];
  //     this.filteredVul.poc.push(fileHandle);
  //   }
  // }

  // removeImg(i:any){
  //   this.filteredVul.poc.splice(i,1);
  // }


  // fileDropped(fileHandle: FileHandle) {
  //   this.filteredVul.poc.push(fileHandle);
  // }