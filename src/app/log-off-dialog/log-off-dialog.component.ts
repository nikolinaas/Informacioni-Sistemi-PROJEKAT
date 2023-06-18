import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-off-dialog',
  templateUrl: './log-off-dialog.component.html',
  styleUrls: ['./log-off-dialog.component.css'],
})
export class LogOffDialogComponent {
  

  constructor(
    private dialogRef: MatDialogRef<LogOffDialogComponent>,
    private router: Router
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  redirectToLogin() {
    sessionStorage.clear();
    this.dialogRef.close();
    this.router.navigate(['login']);

  }
}
