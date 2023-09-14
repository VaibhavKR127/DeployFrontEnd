import { Component, OnInit } from '@angular/core';
import { vulfound } from '../vulfound.model';
import { VfoundService } from '../vfound.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgproserService } from '../imgproser.service';
import { delay, map } from 'rxjs';
import { AddCompserService } from '../add-compser.service';
import { TestlistserService } from '../testlistser.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-testvul',
  templateUrl: './testvul.component.html',
  styleUrls: ['./testvul.component.css']
})
export class TestvulComponent implements OnInit{
  

  constructor(private tser:TestlistserService,private router:Router,private vser:VfoundService,private auth:AuthService) { }
  curuser:any={};
  id:any=localStorage.getItem("tid");
  tid:number = JSON.parse(this.id);
  vfoundlist:vulfound[]=[];
  test:any;
  vulfordel:any={};
  user:any={};
  
  ngOnInit(): void {
    this.getVulList(this.tid);
    this.user=localStorage.getItem("curuser");
    this.curuser=JSON.parse(this.user);
  }

  getVulList(id:any){
    return this.tser.ShowSelectedtest(id).subscribe((data:any)=>{
      
      this.test=data;
      this.vfoundlist=this.test.vulnerabilities;
      //console.log(this.vfoundlist,"vullist");
    })
  }
  async editVul(vfid:any){
   // this.router.navigate(['/vfound',{vfid:vfid}])

    this.selVul(vfid);
  await new Promise(resolve => setTimeout(resolve, 100)); 
  //console.log("uid",this.curuser.uid,"vuluid",this.vulfordel);
  
  if(this.curuser.uid==this.vulfordel.uid || this.curuser.uid==1){
    this.router.navigate(['/vfound',{vfid:vfid}])
 
  }
  else{
    alert("Other's Contribution")
  }
  }  

AddNewVul(){
 // localStorage.clear();
  localStorage.setItem('tfid',JSON.stringify(this.tid));
  this.router.navigate(['/vfound'])
}

  async delVul(vfid:any): Promise<void>{
  this.selVul(vfid);
  await new Promise(resolve => setTimeout(resolve, 100)); 
  //console.log("uid",this.curuser.uid,"vuluid",this.vulfordel);
  
  if(this.curuser.uid==this.vulfordel.uid || this.curuser.uid==1){
     this.vser.deletevfound(vfid).subscribe((data:any)=>
  {
    //console.log(data);
    this.ngOnInit();
  })
 
  }
  else{
    alert("Other's Contribution")
  }
}

selVul(vfid:any){
  this.vser.ShowSelectedvSfound(vfid).subscribe((data:any)=>
  {
    this.vulfordel=data;
   // console.log(this.vulfordel);
  })
}

viewVul(vfid:any){
  // localStorage.clear();
  // localStorage.setItem('vid',JSON.stringify(vid));
  this.router.navigate(['/view-vul',{vfid:vfid}])
}



}
