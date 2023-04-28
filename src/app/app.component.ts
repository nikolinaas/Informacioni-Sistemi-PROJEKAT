import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogOffDialogComponent } from './log-off-dialog/log-off-dialog.component';
import { ShowKindergartenInfoComponent } from './show-kindergarten-info/show-kindergarten-info.component';
import { KindergartenService } from './show-kindergarten-info/services/kindergarten.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vjezba1';
  selectedMenu: any = 'Home';

  constructor(
    private dialog: MatDialog,
    private kindergartenService: KindergartenService
  ) {
    this.kindergartenService.getInfo();
  }

  goTo(paramText: string) {
    this.selectedMenu = paramText;
  }

  logOff() {
    this.dialog.open(LogOffDialogComponent, {
      width: '400px',
    });
  }

  showInfo() {
    this.dialog.open(ShowKindergartenInfoComponent, {
      width: '400px',
    });
  }
}
