import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { ChildrenService } from './children/children.service';
import { GroupsComponent } from './groups/groups.component';
import { GroupsService } from './groups/groups.service';


@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChildrenService,
    GroupsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
