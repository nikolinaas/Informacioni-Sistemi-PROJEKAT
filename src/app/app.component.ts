import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
}
