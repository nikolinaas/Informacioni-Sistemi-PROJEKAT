import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildrenService } from './../../services/children.service';

@Component({
  selector: 'app-delete-child',
  templateUrl: './delete-child.component.html',
  styleUrls: ['./delete-child.component.css']
})
export class DeleteChildComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private childService: ChildrenService,
    private snackBar: MatSnackBar
  ) {}

  deleteChild(){
    this.childService.deleteChild(this.data.id).subscribe((response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspjesno ste obrisali dijete', undefined, {
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
