import { FileHandle } from "./file-handle";
import { pocdes } from "./pocdes.model";

export interface vulfound{
    tid:number,
    vfid:number,
    uid:number,
    vfname:string,
    status:string,
    affectedurls:string,
    description:string,
    remediation:string,
    severity:string,
    vreferences:string,
    poc:FileHandle[],
    pocdes:string[]
}