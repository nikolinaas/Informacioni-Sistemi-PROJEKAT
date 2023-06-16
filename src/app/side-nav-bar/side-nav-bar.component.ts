import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogOffDialogComponent } from '../log-off-dialog/log-off-dialog.component';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  goTo(paramText: string) {
    this.router.navigate([paramText]);
  }

  logOff() {
    this.dialog.open(LogOffDialogComponent, {
      width: '400px',
    });
  }
}
