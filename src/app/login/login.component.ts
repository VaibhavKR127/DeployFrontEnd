import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserlistService } from '../userlist.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any={};
  uname:any;
  password:any;
  constructor(private userv:UserlistService,private router:Router, private auth:AuthService) { }
  ngOnInit(): void {
   //this.getUserbyname();
   this.auth.setuser();
  }
  getUserbyname(name:any) {
    return this.userv.getUserbyName(name).subscribe((data:any)=>
    {
      //console.log(data);
      this.user = data;
    })
  }

  fetchuser(){
    this.getUserbyname(this.uname);
    //console.log(this.user);
  }
  userexists(){
    if(this.user==null){
      //console.log("Fail");
      alert("InValid Credentials");
    }
    else{
    if(this.user.upass==this.password){
      //console.log("Success");
      //this.auth.setuser(this.user);
      this.auth.setLoggedIn();
      this.router.navigate(['/testlist']);
      localStorage.setItem('curuser',JSON.stringify(this.user));
      //console.log(this.auth.getloggedIn())
    }
    else{
      alert("InValid Credentials"); 
      //console.log("Fail");
    }
  }
}

}
