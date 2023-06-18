import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from '../../services/activity.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.css']
})
export class DeleteActivityDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activityService:ActivityService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
  deleteActivity(){

    this.activityService.deleteActivity(this.data.idG,this.data.idAct).subscribe(     (response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspješno ste obrisali aktivnost ', '', {
          duration: 2000,
        });
        this.dialogRef.close(true);
        this.closeDialog(); 
      }
    })
    
  }}
