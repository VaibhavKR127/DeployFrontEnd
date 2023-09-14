import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vulfound } from './vulfound.model';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class VfoundService {

  constructor(private httpclient:HttpClient) { }
  
  Addvfound(Vfound :FormData){
    return this.httpclient.post(`${baseURL}/vfound/list`,Vfound);
  }

  getAlltests(){
    return this.httpclient.get<vulfound[]>(`${baseURL}/vfound/list`);
  }

  getAlltestswithdesc(){
    return this.httpclient.get(`${baseURL}/vfound/list`);
  }

  deletevfound(id:any){
    return this.httpclient.delete(`${baseURL}/vfound/list/`+id);
  }

  updatevfound(vset:any){
    return this.httpclient.put(`${baseURL}/vfound/list`,vset);
  }

  ShowSelectedvSfound(id:any){
    return this.httpclient.get<vulfound>(`${baseURL}/vfound/list/`+id)
  }

  vSfoundwithpd(id:any){
    return this.httpclient.get(`${baseURL}/vfound/list/`+id)
  }

}
