import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

  
  constructor(private httpclient:HttpClient) { }

  getAllUsers(){
    return this.httpclient.get(`${baseURL}/users/list`)
  }

  getUserbyName(uname:any){
    return this.httpclient.get(`${baseURL}/users/list1/`+uname);
  }

  delUser(uid:any){
    return this.httpclient.delete(`${baseURL}/users/list/`+uid);
  }

  updUser(user:any){
    return this.httpclient.put(`${baseURL}/users/list`,user);
  }

  getUserById(id:any){
    return this.httpclient.get(`${baseURL}/users/list/`+id);
  }

  addUser(user:any){
    return this.httpclient.post(`${baseURL}/users/list`,user);
  }

}
