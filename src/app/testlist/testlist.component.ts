import { Component, OnInit } from '@angular/core';
import { TestlistserService } from '../testlistser.service';
import { Router } from '@angular/router';
import { AddCompserService } from '../add-compser.service';
import { SerTypeService } from '../ser-type.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserlistService } from '../userlist.service';
import { AuthService } from '../auth.service';
import { baseURL } from 'src/environment';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.css']
})
export class TestlistComponent implements OnInit{

  constructor(private http: HttpClient,private tser:TestlistserService , private router: Router,private compser:AddCompserService,private sert:SerTypeService,private auth:AuthService) { }

  newtest:any={};
  testlist:any;
  showForm: boolean = false;
  compList:any={};
  servList:any={};
  selectedcomp:any;
  selectedserv:any;
  curuser:any={};
  user:any={};
  ngOnInit(): void {
    this.getTestList();
    this.getcomp();
    this.getServ();
    this.user=localStorage.getItem("curuser");
    this.curuser=JSON.parse(this.user);
  }

getTestList(){
  return this.tser.Showtest().subscribe((data:any)=>{
  //console.log(data);
  this.testlist=data;
});

}

view(tid:any){
  this.router.navigate(['/testvul'])
  localStorage.setItem('tid',JSON.stringify(tid));
}

addNewTest(){
  //console.log(this.newtest,"New Test")
  this.tser.Addtest(this.newtest).subscribe((data:any)=>
  {
    //console.log(data);
    this.newtest={}
    this.ngOnInit();
    this.showForm=false;
  })
}


cancelAddTest() {
  this.newtest = {}; // Reset the newcategory object
  this.showForm = false; // Hide the form
}


addTest(){
  this.showForm = true;
}


downloadFile(tid:any) {
  const fileName = 'example.docx'; // Specify the filename
  
  // Make an HTTP GET request to download the file
  this.http.get(`${baseURL}/test/files/${tid}`, {
    responseType: 'blob', // Set the response type to blob
    headers: new HttpHeaders().append('Accept', 'application/octet-stream')
  }).subscribe(response => {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

delVul(tid:any){

  if(this.curuser.uname=="Admin"){
    //console.log("Delete test",this.curuser);
  this.tser.deltest(tid).subscribe((data:any)=>
  {
    //console.log(data);
    this.ngOnInit();
  })
}
else{
  alert("Only Admin can Delete the Test ")
}
}

getcomp(){
  return this.compser.ShowCompanies().subscribe((data:any)=>
  {
    //console.log(data);
    this.compList=data;
  })
}


getServ(){
  return this.sert.ShowServices().subscribe((data:any)=>
  {
    //console.log(data);
    this.servList=data;
  })
}


onselectedcomp(data:any){
  //console.log(data);
  this.selectedcomp=data.value;
  this.newtest.cid=this.selectedcomp.cid;
}


onselectedserv(data:any){
  this.selectedserv=data.value;
  this.newtest.sid=this.selectedserv.sid;
}

}



