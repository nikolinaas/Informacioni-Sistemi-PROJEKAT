import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { ChildrenService } from './children/children.service';


@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChildrenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
