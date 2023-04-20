import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from './home/create-group-dialog/create-group-dialog.component';
import { LogOffDialogComponent } from './log-off-dialog/log-off-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vjezba1';
  selectedMenu: any = 'Home';

  constructor(private dialog: MatDialog) {}

  goTo(paramText: string) {
    this.selectedMenu = paramText;
  }

  logOff() {
    this.dialog
      .open(LogOffDialogComponent, {
        width: '400px',
      })
  }
}
