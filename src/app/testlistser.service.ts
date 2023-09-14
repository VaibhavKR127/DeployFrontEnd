import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class TestlistserService {

  constructor(private httpclient:HttpClient) { }
 
  Addtest(Test :any){
    return this.httpclient.post(`${baseURL}/test/list`,Test);
  }

  Showtest(){
    return this.httpclient.get(`${baseURL}/test/list`)
  }

  deltest(id:any){
    return this.httpclient.delete(`${baseURL}/test/list/`+id);
  }

  updtest(test:any){
    return this.httpclient.put(`${baseURL}/test/list`,test);
  }

  ShowSelectedtest(id:any){
    return this.httpclient.get(`${baseURL}/test/list/`+id)
  }

  
}
