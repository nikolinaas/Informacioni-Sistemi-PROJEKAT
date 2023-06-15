import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
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
import { DeleteChildComponent } from './children/delete-child-dialog/delete-child/delete-child.component';
import { CreateChildComponent } from './children/create-child-dialog/create-child/create-child.component';
import { EditChildComponent } from './children/edit-child/edit-child/edit-child.component';
import { EditChildDialogComponent } from './children/edit-child/edit-child-dialog/edit-child-dialog/edit-child-dialog.component';
import { UserComponent } from './user/user/user.component';
import { ChangeCredentialsComponent } from './user/change-credentials/change-credentials/change-credentials.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { GroupComponent } from './home/group/group/group.component';
import { ActivitiesComponent } from './home/group/group/activities/activities.component';
import { ChangeGroupNameDialogComponent } from './home/group/group/change-group-name-dialog/change-group-name-dialog.component';
import { FinanceComponentComponent } from './finance/finance-component/finance-component.component';
import { MjesecniTroskoviComponent } from './finance/mjesecni-troskovi/mjesecni-troskovi.component';
import { DugovanjaComponent } from './finance/dugovanja/dugovanja.component';
import { CreateDialogComponent } from './finance/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from './finance/delete-dialog/delete-dialog.component';
import { CreateBillDialogComponent } from './finance/create-bill-dialog/create-bill-dialog.component';


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
    DeleteChildComponent,
    CreateChildComponent,
    EditChildComponent,
    EditChildDialogComponent,
    UserComponent,
    ChangeCredentialsComponent,
    SideNavBarComponent,
    GroupComponent,
    ActivitiesComponent,
    ChangeGroupNameDialogComponent,
    FinanceComponentComponent,
    MjesecniTroskoviComponent,
    DugovanjaComponent,
    CreateDialogComponent,
    DeleteDialogComponent,
    CreateBillDialogComponent,
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
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
