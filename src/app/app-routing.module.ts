import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowCompanyComponent } from './show-company/show-company.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { VsetComponent } from './vset/vset.component';
import { VfoundComponent } from './vfound/vfound.component';
import { ShowVfoundComponent } from './show-vfound/show-vfound.component';
import { VulresolverService } from './vulresolver.service';
import { TestvulComponent } from './testvul/testvul.component';
import { TestlistComponent } from './testlist/testlist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { authguardGuard } from './authguard.guard';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ViewVulComponent } from './view-vul/view-vul.component';

const routes: Routes = [{path:"add-company",component:AddCompanyComponent,canActivate: [authguardGuard]},
{path:'show-company',component:ShowCompanyComponent ,canActivate: [authguardGuard]},
{path:'service-type',component:ServiceTypeComponent,canActivate: [authguardGuard] },
{path:'vset',component:VsetComponent, canActivate: [authguardGuard]},
{path:'vfound',component:VfoundComponent,resolve:{
  vfound:VulresolverService
}},
{path:'show-vfound',component:ShowVfoundComponent,canActivate: [authguardGuard]},

{path:'testvul',component:TestvulComponent, canActivate: [authguardGuard]},
{path:'testlist',component:TestlistComponent,canActivate: [authguardGuard]},

{path:'userlist',component:UserlistComponent,canActivate: [authguardGuard]},
{path:'',component:LoginComponent},
{path:'view-vul',component:ViewVulComponent,resolve:{
  vfound:VulresolverService
}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
