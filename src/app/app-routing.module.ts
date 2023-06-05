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

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'evidence', component:EvidenceComponent },
  {path: 'children', component:ChildrenComponent },
  {path: 'edit/:id', component:EditChildComponent },
  {path: 'user', component:UserComponent }, //TODO treba dodati /:id gdje se id prosljedjuje prilikom logovanja, za sada je hardkodovan u komponenti 
  {path: 'group/:id', component: GroupComponent, data: {group : Group}},
  {path: 'activity', component: ActivitiesComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
