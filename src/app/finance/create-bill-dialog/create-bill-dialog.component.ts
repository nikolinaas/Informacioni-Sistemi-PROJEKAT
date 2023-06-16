import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { Kindergarten } from 'src/app/model/kindergarten.model';
import { Address } from 'src/app/model/address.model';
import { FinanceServiceService } from '../services/finance-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = _moment;
@Component({
  selector: 'app-create-bill-dialog',
  templateUrl: './create-bill-dialog.component.html',
  styleUrls: ['./create-bill-dialog.component.css']
})
export class CreateBillDialogComponent {
  datum=moment();
  private _dateToShow?: string;
  private _dateToFind?: string;
  number: string='';
  iznos: string='';
  naziv: string='';
  date: string='';
  paid: string='';
  pom: boolean=true;

  constructor(private dialogRef: MatDialogRef<CreateDialogComponent>,
    private financeService: FinanceServiceService,
      private snackBar: MatSnackBar)
  {
    
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log("Pozvala se metoda");
      this.datum = moment(event.value);
      this._dateToShow = this.datum.format('DD') + "-" + this.datum.format('MM') + "-" + this.datum.format('YYYY');
      this._dateToFind = this.datum.format('YYYY') + "-" + this.datum.format('MM') + "-" + this.datum.format('DD');


    
  }
  closeDialog(){
    this.dialogRef.close();
  }

  saveBill() {
    const kindergarten = new Kindergarten();
        kindergarten.name = 'Vrtic 1';
        kindergarten.phoneNumber = '123-456-7890';

        const address = new Address();
        address.street = '123 Main St';
        address.city = 'Example City';
        address.number = 5;
        kindergarten.address = address;


        if(this.paid=="option1")
        this.pom=true;
      else
        this.pom=false;
      console.log(this.paid);
      const data = {
        billNumber: this.number,
        billType: this.naziv,
        amount: parseInt(this.iznos,10),
        date: this._dateToFind,
        paid: this.pom,
        kindergartenName: kindergarten.name  };

        console.log(data.billType+data.date);

      this.financeService.createBill(data).subscribe((response: any) => {
        if (response.status == 201) {
          this.snackBar.open('Uspjesno ste kreirali racun ', '', {
            duration: 2000,
          });
        }
      },
      () => {
        this.snackBar.open(
          'Nije moguće kreirati racun!',
          '',
          {
            duration: 2000,
          }
        );
      }
    );

  }
}
