import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogOffDialogComponent } from '../log-off-dialog/log-off-dialog.component';
import { KindergartenService } from '../show-kindergarten-info/services/kindergarten.service';
import { ShowKindergartenInfoComponent } from '../show-kindergarten-info/show-kindergarten-info.component';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {

  userData: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private kindergartenService: KindergartenService,
    private dataSharingService: DataSharingService
  ) {
    this.kindergartenService.getInfo();
  }

  ngOnInit(){
    this.userData = this.dataSharingService.getSharedData();
  }

  goTo(paramText: string) {
    this.router.navigate([paramText]);
  }

  logOff() {
    this.dialog.open(LogOffDialogComponent, {
      width: '400px',
    });
  }
}
