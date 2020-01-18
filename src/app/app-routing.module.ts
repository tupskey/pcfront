import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddCandidateComponent } from './candidate/add-candidate.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { EditComponent } from './candidate/edit-candidate.component';
import { AuthGuard } from './shared/auth.guard';
import { CandidateListResolver } from './candidate/candidate-list.resolver';
import { EdItCandidateResolver } from './candidate/edit-candidate.resolver';





const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  {path: 'addCandidate', component: AddCandidateComponent, canActivate: [AuthGuard]},
  {path: 'candidate-list', component: CandidateListComponent ,canActivate: [AuthGuard], resolve: {Candidates: CandidateListResolver}},
  {path: 'edit-candidate/:id', component: EditComponent , canActivate: [AuthGuard]},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
