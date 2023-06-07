import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EducatorsService } from '../service/educators.service';

@Component({
  selector: 'app-delete-educator-dialog',
  templateUrl: './delete-educator-dialog.component.html',
  styleUrls: ['./delete-educator-dialog.component.css']
})
export class DeleteEducatorDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteEducatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educatorsService: EducatorsService,
    private snackBar: MatSnackBar
  ) {}

  deleteEducator(){
    this.educatorsService.deleteEducator(this.data.id).subscribe((response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspjesno ste uklonili vaspitača', undefined, {
          duration: 2000,
        });
        this.dialogRef.close(true);
      }
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
