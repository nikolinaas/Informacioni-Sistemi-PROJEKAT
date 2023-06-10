import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './children/children.component';
import { EditChildComponent } from './children/edit-child/edit-child/edit-child.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { GroupComponent } from './home/group/group/group.component';
import { Group } from './model/Group';
import { ActivitiesComponent } from './home/group/group/activities/activities.component';
import { EducatorsComponent } from './educators/educators.component';
import { ViewEducatorComponent } from './educators/view-edit-educator/view-educator/view-educator.component';
import { LogInComponent } from './log-in/log-in/log-in.component';
// import { CreateDialogComponent } from './finance/create-dialog/create-dialog.component';
// import { DeleteDialogComponent } from './finance/delete-dialog/delete-dialog.component';
// import { DugovanjaComponent } from './finance/dugovanja/dugovanja.component';
// import { FinanceComponentComponent } from './finance/finance-component/finance-component.component';
// import { MjesecniTroskoviComponent } from './finance/mjesecni-troskovi/mjesecni-troskovi.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LogInComponent },

  { path: 'groups', component: HomeComponent },
  { path: 'groups/:id', component: GroupComponent, data: {group : Group} },
  { path: 'groups/:id/activities', component: ActivitiesComponent },

  { path: 'children', component: ChildrenComponent },
  { path: 'children/:id', component: EditChildComponent },

  { path: 'educators' , component: EducatorsComponent },
  { path: 'educators/:id', component: ViewEducatorComponent },

  { path: 'evidence', component: EvidenceComponent },

  { path: 'account-information', component: UserComponent },

  { path: '**', redirectTo: '/groups', pathMatch: 'full' }

//   {path: 'finance', component:FinanceComponentComponent},
//   {path: 'troskovi', component:MjesecniTroskoviComponent},
//   {path: 'dugovanja', component:DugovanjaComponent},
//   {path: 'dialog',component:CreateDialogComponent},
//   {path: 'deleteDialog', component:DeleteDialogComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
