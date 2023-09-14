import { Component } from '@angular/core';
import { VfoundService } from '../vfound.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FileHandle } from '../file-handle';
import { vulfound } from '../vulfound.model';
import { NgForm } from '@angular/forms';
import { VsetService } from '../vset.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-vul',
  templateUrl: './view-vul.component.html',
  styleUrls: ['./view-vul.component.css']
})
export class ViewVulComponent {

  newvul: any={};
  curuser:any={};
  Vulnlist:any={};
  
  isnewvul=true;
  showForm: boolean = false;
  selectedVul:any={};
  
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
    //this.id=localStorage.getItem("tfid");
   // this.tfid= JSON.parse(this.id);
   // this.filteredVul.tid=this.tfid;
    //console.log(this.tfid,"Hi there")
    this.id=localStorage.getItem("tfid");
    this.tfid= JSON.parse(this.id);
    
    this.curuser=this.auth.getuser();


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
    //console.log("test",this.filteredVul);
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
   
    const testFormData = this.prepareFormData(this.filteredVul);
    
    this.vfser.Addvfound(testFormData).subscribe((data:any)=>
    {
      
      testForm.reset();
      this.filteredVul.poc=[];

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
 //   this.newtest = {}; // Reset the newcategory object
   this.router.navigate(["testlist"]);
  }
 
  

  fileDropped(fileHandle: FileHandle) {
    this.filteredVul.poc.push(fileHandle);
    this.filteredVul.pocdes.push()
  }
}
