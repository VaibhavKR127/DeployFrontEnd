import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AddCompserService {

  constructor(private httpclient: HttpClient) {}

  AddCompany(company :any){
    //return this.httpclient.post('${baseURL}/company/list',company);
    return this.httpclient.post(`${baseURL}/company/list`,company)
  }

  ShowCompanies(){
    return this.httpclient.get(`${baseURL}/company/list`);
  }

  deleteCompany(id:any){
    return this.httpclient.delete(`${baseURL}/company/list`+id);
  }

  updateCompany(company:any){
    return this.httpclient.put(`${baseURL}/company/list`,company);
  }

  ShowCompanybyId(id:any){
    return this.httpclient.get(`${baseURL}/company/list`+id);
  }
}
