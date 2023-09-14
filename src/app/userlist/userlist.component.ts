import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserlistService } from '../userlist.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  users:any={};
  showForm=false;
  editinguser=false;
  newuser:any={};
  selecteduser:any={};
  curuser:any={};
  user:any={};
  constructor(private userv:UserlistService,private router:Router,private auth:AuthService) { }
  ngOnInit(): void {
   this.getUsers();
  }

getUsers(){
  this.userv.getAllUsers().subscribe((data:any)=>
  {
    this.users=data;
    //console.log(data);
  })
}

adduser(){
  this.user=localStorage.getItem("curuser");
    this.curuser=JSON.parse(this.user);
  if(this.curuser.uid==1){
    this.showForm=true;
  }
  else{
    alert("Access Denied");
  }
  
}

editUser(user:any){

  this.curuser=this.auth.getuser();
  if(this.curuser.uid==1 || this.curuser.uid==user.uid){
    this.editinguser=true;
  this.selecteduser=user;
  }
  else{
    alert("Access Denied");
  }

  
}

addNewuser(){
  this.userv.addUser(this.newuser).subscribe((data:any)=>
  {
    this.ngOnInit();
    //console.log(data);
    this.showForm=false;
  })
  
}

updateuser(){
  this.userv.updUser(this.selecteduser).subscribe((data:any)=>
  {
    this.ngOnInit();
    //console.log(data);
    this.editinguser=false;
  })
  
}

cancelUpdateuser(){
  this.editinguser=false;
}

cancelAdduser(){
  this.showForm=false;
}

delUser(uid:any){

  this.curuser=this.auth.getuser();
  if(this.curuser.uid==1){
    this.userv.delUser(uid).subscribe((data:any)=>
    {
      this.ngOnInit();
      //console.log(data);
    })
  }
  else{
    alert("Access Denied");
  }



 
  
}

}
