import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogOffDialogComponent } from '../log-off-dialog/log-off-dialog.component';
import { KindergartenService } from '../show-kindergarten-info/services/kindergarten.service';
import { ShowKindergartenInfoComponent } from '../show-kindergarten-info/show-kindergarten-info.component';


@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {
  showInfo() {
    this.router.navigate(['info']);
  }

  isAdmin: any;
  admin: boolean=false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private kindergartenService: KindergartenService,
  ) {
    this.kindergartenService.getInfo();
  }

  ngOnInit(){
    this.isAdmin = sessionStorage.getItem('isAdmin'); 
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
