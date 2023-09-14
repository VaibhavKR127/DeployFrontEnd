import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SerTypeService {

  constructor(private httpclient:HttpClient) { }
  
  AddService(service :any){
    return this.httpclient.post(`${baseURL}/servicetype/list`,service);
  }

  ShowServices(){
    return this.httpclient.get(`${baseURL}/servicetype/list`)
  }

  deleteService(id:any){
    return this.httpclient.delete(`${baseURL}/servicetype/list/`+id);
  }

  updateService(service:any){
    return this.httpclient.put(`${baseURL}/servicetype/list`,service);
  }


}
