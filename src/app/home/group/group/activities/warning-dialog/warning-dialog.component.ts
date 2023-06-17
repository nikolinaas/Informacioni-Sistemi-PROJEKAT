import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<WarningDialogComponent>,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }


}
