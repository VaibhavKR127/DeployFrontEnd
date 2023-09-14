import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
//import { AdminServiceService } from './admin-service.service';
@Injectable({
  providedIn: 'root'
})
export class authguardGuard implements CanActivate 
{
  constructor(private auth:AuthService)
  {

  }
  canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   {
      //console.log(this.auth.getloggedIn());
     return this.auth.getloggedIn(); //return false;
   }
  }
