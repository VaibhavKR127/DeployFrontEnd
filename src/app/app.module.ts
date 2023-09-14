import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

import { ShowCompanyComponent } from './show-company/show-company.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { VsetComponent } from './vset/vset.component';
import { VfoundComponent } from './vfound/vfound.component';
import { ShowVfoundComponent } from './show-vfound/show-vfound.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { TestvulComponent } from './testvul/testvul.component';
import { ViewVulComponent } from './view-vul/view-vul.component';
import { TestlistComponent } from './testlist/testlist.component';

import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { AddCompanyComponent } from './add-company/add-company.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowCompanyComponent,
    ServiceTypeComponent,
    VsetComponent,
    VfoundComponent,
    ShowVfoundComponent,
   
    TestvulComponent,
    ViewVulComponent,
    TestlistComponent,
  
    UserlistComponent,
    LoginComponent,
    AddCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
