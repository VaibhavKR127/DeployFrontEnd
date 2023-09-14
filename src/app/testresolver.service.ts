import { Injectable } from '@angular/core';
import { TestlistserService } from './testlistser.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestresolverService implements Resolve<any>{

  constructor(private tser:TestlistserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
    const id = route.paramMap.get("tid");

    if(id){
      return this.tser.ShowSelectedtest(id);
    }
    else{
      return of(this.getVuls())
    }


 
}

getVuls(){
      return [{
        tid: 0,
      vfid: null,
      vfname: '',
      status: '',
      affectedurls: '',
      description: '',
      remediation: '',
      severity: '',
      vreferences: '',
      poc: [],
      pocdes:[]
      }]
}
}