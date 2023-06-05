import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
   combo1:string = '';
   usluga:string = '';
   combo2:string = '';
   combo3:string = '';
   iznos:string = '';
   datetime:string = '';
   constructor(private dialogRef: MatDialogRef<CreateDialogComponent>)
   {
    
   }
   closeDialog()
   {
    this.dialogRef.close();
   }
}
