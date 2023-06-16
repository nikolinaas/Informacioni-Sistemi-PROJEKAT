import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from './../services/group.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-group-dialog',
  templateUrl: './delete-group-dialog.component.html',
  styleUrls: ['./delete-group-dialog.component.css'],
})
export class DeleteGroupDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.data.id).subscribe((response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspješno ste obrisali grupu.', undefined, {
          duration: 2000,
        });
        this.dialogRef.close(true);
      }
    });
  }
}
