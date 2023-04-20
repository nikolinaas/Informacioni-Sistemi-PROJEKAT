import { GroupService } from './../services/group.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent {
  group: any = { title: ''};

  faRemove = faRemove;

  constructor(
    private dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    private snackBar: MatSnackBar,
    private groupService: GroupService
  ) {}


  closeDialog() {
    this.dialogRef.close();
  }

  createGroup() {
    if(this.group.title != ''){
      this.groupService.createGroup(this.group.title).subscribe((response: any) => {
        if(response.status == 201){
          this.snackBar.open('Uspjesno ste kreirali grupu', undefined, {
            duration: 2000,
          });
          this.dialogRef.close(true);
        }
      });
    }
  }
}
