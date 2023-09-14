import { Component, OnInit } from '@angular/core';
import { VsetService } from '../vset.service';
import { VfoundService } from '../vfound.service';
import { vulfound } from '../vulfound.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgproserService } from '../imgproser.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-vfound',
  templateUrl: './show-vfound.component.html',
  styleUrls: ['./show-vfound.component.css']
})
export class ShowVfoundComponent implements OnInit{

  istestvul=true;
  vfoundlist:vulfound[]=[];
  constructor(private vser:VfoundService , private router: Router,private sanit:DomSanitizer,private imgser:ImgproserService,private activatedRoute:ActivatedRoute) { }
  
  ngOnInit() {
    this.getvfound();
  }
  getvfound() {
    return this.vser.getAlltests().pipe(
    map((x:vulfound[],i)=>x.map((vfound:vulfound)=>this.imgser.createImages(vfound))))
    .subscribe((data:vulfound[])=>{
    //console.log(data);
    this.vfoundlist=data;
    }
    )
    }

    editVul(vfid:any){
      this.router.navigate(['/vfound',{vfid:vfid}])
    }

    delVul(vfid:any){
      this.vser.deletevfound(vfid).subscribe((data:any)=>
      {
        //console.log(data);
        this.ngOnInit();
      })
    }

    AddNewVul(){
      this.router.navigate(['/vfound'])
    }
  }


