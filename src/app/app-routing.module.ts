import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './children/children.component';
import { EditChildComponent } from './children/edit-child/edit-child/edit-child.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'evidence', component:EvidenceComponent },
  {path: 'children', component:ChildrenComponent },
  {path: 'edit', component:EditChildComponent }
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
