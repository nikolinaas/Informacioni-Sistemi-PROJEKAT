import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Finance } from 'src/app/model/Finance';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FinanceServiceService } from '../services/finance-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateBillDialogComponent } from '../create-bill-dialog/create-bill-dialog.component';
import { Kindergarten } from 'src/app/model/kindergarten.model';
import { Address } from 'src/app/model/address.model';

@Component({
  selector: 'app-mjesecni-troskovi',
  templateUrl: './mjesecni-troskovi.component.html',
  styleUrls: ['./mjesecni-troskovi.component.css'],
})
export class MjesecniTroskoviComponent implements OnInit {
  
     isChecked: boolean = false;
     name:string;
     vrsta:string;
     iznos:string;
     datetime:string;
     combo:string;
     pom: Boolean;
     constructor(private router:Router, private dialog: MatDialog, private financeService: FinanceServiceService,
      private snackBar: MatSnackBar)
     {
      this.name='';
      this.vrsta='';
      this.iznos='';
      this.datetime=''
      this.combo='';
      this.pom=true;
     }
     columns = ["Broj racuna","Vrsta racuna","Iznos","Datum","Placeno",""];
     index = ["billNumber","billType","amount","date","paid"];

  finance: Finance[] = [];
  load() {
    this.financeService.getBill().subscribe((responese) => {
      this.finance = responese as Finance[];
    });
  }

  ngOnInit(): void {

      this.load();
  }

     addClick()
     {
      this.dialog.open(CreateBillDialogComponent,{
        width: '400px'}).afterClosed()
        .subscribe(() => {
          this.load()
        });
     
     }
     deleteClick()
     {
      this.dialog.open(DeleteDialogComponent,{
        width: '350px',
        height: '200px'}).afterClosed()
        .subscribe(() => {
          this.load()
        });
     }

     onComboBoxClick(financ: Finance)
     {
        console.log(financ.billNumber);

        this.financeService.putBill(financ.billNumber).subscribe(
          (response: any) => {
            // Check if response and response.status are not null
            if (response && response.status==200) {
              // Access the 'status' property
              this.snackBar.open('Success!', 'Close', { duration: response.status });
            } else {
              // Handle the case when response or response.status is null
              console.error('Invalid response or response.status is null.');
            }
          },
          (error) => {
            console.error(error);
          }
        );
    
        // ...
      
     }


     deleteClickRow(financ: Finance){
        console.log(financ.billNumber);

        this.financeService.deleteBill(financ.billNumber).subscribe((response: any) => {
      if (response.status == 200) {
        this.snackBar.open('Uspjesno ste obrisali racun', undefined, {
          duration: 2000,
        });
        this.load();
       // this.dialogRef.close(true);
      }
      else{
        this.snackBar.open('Taj racun ne postoji u bazi', undefined, {
          duration: 2000,
        });
       // this.dialogRef.close(true);
      }
    });
     }
}
