import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { ChildrenService } from './children/children.service';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateGroupDialogComponent } from './home/create-group-dialog/create-group-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LogOffDialogComponent } from './log-off-dialog/log-off-dialog.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { ArrivalDepartureTimeComponent } from './evidence/arrival-departure-time/arrival-departure-time.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DeleteGroupDialogComponent } from './home/delete-group-dialog/delete-group-dialog.component';
import { ShowKindergartenInfoComponent } from './show-kindergarten-info/show-kindergarten-info.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    HomeComponent,
    CreateGroupDialogComponent,
    LogOffDialogComponent,
    EvidenceComponent,
    ArrivalDepartureTimeComponent,
    DeleteGroupDialogComponent,
    ShowKindergartenInfoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    ChildrenService,
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
