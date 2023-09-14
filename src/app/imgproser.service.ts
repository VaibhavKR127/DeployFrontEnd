import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { vulfound } from './vulfound.model';
import { FileHandle } from './file-handle';

@Injectable({
  providedIn: 'root'
})
export class ImgproserService {

  constructor(private sanit:DomSanitizer) { }


  public createImages(vfound:vulfound){
    const vfpoc:any[]=vfound.poc;

    const vfpocToFH:FileHandle[]=[];
    const pocdeslist:any[]=[];
    vfpoc.sort((a,b)=>a.pid-b.pid);
    //console.log(vfpoc,"poc order")
    let k=0;
    for(let i=0;i<vfpoc.length;i++){
      const imgfdata = vfpoc[i];
      //console.log(vfpoc[i].pocdes[k].pdesc,'description',k)
      //console.log("hello")
      //const pocdes = vfpoc[i].pdesc[i];
      const imgBlob = this.dataURItoBlob(imgfdata.pic_byte,imgfdata.ptype);

      const imgfile = new File([imgBlob],imgfdata.pname,{type: imgfdata.ptype});
      //console.log(imgfile);
      const finalfileHandle:FileHandle={
        file: imgfile,
        url: this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(imgfile))
        
      };

      vfpocToFH.push(finalfileHandle);
      pocdeslist.push(vfpoc[i].pocdes[k].pdesc);
    }

    vfound.poc=vfpocToFH;
    vfound.pocdes=pocdeslist;
    //console.log(pocdeslist,"list");
    return vfound;
  }

  
  public dataURItoBlob(picBytes: any,imageType: any){
    const byteString = window.atob(picBytes);
    const arrBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrBuffer);
  
    for(let i=0;i<byteString.length;i++){
        int8Array[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([int8Array],{type:imageType});
    return blob;
  
  }

}
