import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user';

  // showlinks:boolean;

  // ngOnInit: any
  constructor(private auth:AuthService){}
  //   //this.showlinks=false;
    
      logout(){
      this.auth.logoutuser();
      }

  //   if(this.auth.getloggedIn()){
  //     this.showlinks=true;
  //   }
  //   else{
  //     this.showlinks=false;
  //   }
 // }

 
}

