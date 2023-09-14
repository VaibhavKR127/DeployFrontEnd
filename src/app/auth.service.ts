import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  curuser:any={};
  suser:any={};
  userloggedIn:boolean;
  constructor() { 
    this.userloggedIn=false;
  }


  getloggedIn(){
    return this.userloggedIn;
  }

  setLoggedIn(){
    this.userloggedIn=true;
  }

  logoutuser(){
    this.userloggedIn=false;
    localStorage.clear();
  }

  setuser(){
    this.suser=localStorage.getItem("curuser");
    this.curuser=JSON.parse(this.suser);
    if(this.curuser!=null){
      this.setLoggedIn();
    }
  }

  getuser(){
    return this.curuser;
  }
}
