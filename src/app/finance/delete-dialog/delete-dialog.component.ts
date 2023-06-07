import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FinanceServiceService } from '../services/finance-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  idRacuna: string = '';

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private financeService: FinanceServiceService,private snackBar: MatSnackBar)
  {

  }

  closeDialog(){
    console.log("Radio"+this.idRacuna);
    this.dialogRef.close();
  }
  deleteBill()
  {
    console.log("asdsadsa");
    /*this.financeService.deleteBill(this.idRacuna).subscribe((response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspjesno ste obrisali racun', undefined, {
          duration: 2000,
        });
        this.dialogRef.close(true);
      }
    });*/
  }

}
