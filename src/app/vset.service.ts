import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class VsetService {

  constructor(private httpclient:HttpClient) { }
  
  AddvSet(Vset :any){
    return this.httpclient.post(`${baseURL}/Vset/list`,Vset);
  }

  ShowvSet(){
    return this.httpclient.get(`${baseURL}/Vset/list`)
  }

  deletevSet(id:any){
    return this.httpclient.delete(`${baseURL}/Vset/list/`+id);
  }

  updatevSet(vset:any){
    return this.httpclient.put(`${baseURL}/Vset/list`,vset);
  }

  ShowSelectedvSet(id:any){
    return this.httpclient.get(`${baseURL}/Vset/list/`+id)
  }

}
