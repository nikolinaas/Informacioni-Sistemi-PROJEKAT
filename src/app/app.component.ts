import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogOffDialogComponent } from './log-off-dialog/log-off-dialog.component';
import { ShowKindergartenInfoComponent } from './show-kindergarten-info/show-kindergarten-info.component';
import { KindergartenService } from './show-kindergarten-info/services/kindergarten.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-Vrtic';
 
}
