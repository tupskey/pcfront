import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/auth.service';
import { NavBarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AddCandidateComponent } from './candidate/add-candidate.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { EditComponent } from './candidate/edit-candidate.component';
import { AuthGuard } from './shared/auth.guard';
import { CandidateListResolver } from './candidate/candidate-list.resolver';
import { TOASTR_TOKEN, Toastr } from './shared/toastr.service';
import { EdItCandidateResolver } from './candidate/edit-candidate.resolver';


declare let toastr: Toastr
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    LoginComponent,
    AddCandidateComponent,
    CandidateListComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    CandidateListResolver,
    EdItCandidateResolver,
    {provide: TOASTR_TOKEN, useValue: toastr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
