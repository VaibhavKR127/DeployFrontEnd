import { Injectable } from '@angular/core';
import { vulfound } from './vulfound.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { VfoundService } from './vfound.service';
import { ImgproserService } from './imgproser.service';

@Injectable({
  providedIn: 'root'
})
export class VulresolverService implements Resolve<vulfound>{

  constructor(private vfser:VfoundService,private imgser:ImgproserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): vulfound | Observable<vulfound> | Promise<vulfound> {
    const id = route.paramMap.get("vfid");
    
    if(id){
      //console.log(id,"Im here");
      return this.vfser.ShowSelectedvSfound(id).pipe(
      map(v =>this.imgser.createImages(v)));
     
    }
    else{
      return of(this.getVuldetails())
    }
  }


  getVuldetails(){
    return {
      tid: 0,
    vfid: 0,
    uid:0,
    vfname: '',
    status: '',
    affectedurls: '',
    description: '',
    remediation: '',
    severity: '',
    vreferences: '',
    poc: [],
    pocdes:[]
    }
  }
}
