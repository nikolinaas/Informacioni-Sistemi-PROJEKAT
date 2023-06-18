import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../services/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-group-name-dialog',
  templateUrl: './change-group-name-dialog.component.html',
  styleUrls: ['./change-group-name-dialog.component.css'],
})
export class ChangeGroupNameDialogComponent {
  group: any = { title: '' };
 
  constructor(
    private dialogRef: MatDialogRef<ChangeGroupNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) {}
 
  closeDialog() {
    this.dialogRef.close();
  }

  updateGroupName() {
    if (this.group.title != '') {
      const group = {
        name: this.group.title,
      };
      this.groupService.editGroup(group, this.data.id).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.snackBar.open(
              'Uspješno ste izmijenili naziv grupe.',
              undefined,
              {
                duration: 2000,
              }
            );
            this.dialogRef.close(true);
          } else if(response.body.statusCode == 404) {
            this.dialogRef.close();
            this.snackBar.open('Nije moguće izmijeniti naziv grupe.', undefined, {
              duration: 2000,
            });
          }
        }
      );
    }
  }
}
