import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  name: string;
  vrsta: string;
  iznos: string;
  datetime: string;
  combo: string;
  pom: Boolean;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private financeService: FinanceServiceService,
    private snackBar: MatSnackBar
  ) {
    this.name = '';
    this.vrsta = '';
    this.iznos = '';
    this.datetime = '';
    this.combo = '';
    this.pom = true;
  }
  columns = ['Broj racuna', 'Vrsta racuna', 'Iznos', 'Datum', 'Placeno'];
  index = ['billNumber', 'billType', 'amount', 'date', 'paid'];

  finance: Finance[] = [];
  load() {
    this.financeService.getBill().subscribe((responese) => {
      this.finance = responese as Finance[];
    });
  }

  ngOnInit(): void {
    /* console.log("Nesto");
    this.finance[0] = {
      "billNumber": "Broj",
      "billType": "Tip",
      "amount": "25",
      "date": "datum",
      "paid": "Placeno",
      "kindergartenName" : "Vrtic"

    };*/
    this.load();
  }

  addClick() {
    this.dialog
      .open(CreateBillDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.load();
      });
    /*if(this.combo=="Da")
        this.pom=true;
      else
        this.pom=false;
      /*console.log(this.name+" "+this.vrsta+" "+this.datetime.substring(0,10));
      const data = {
        billNumber: this.name,
        billType: this.vrsta,
        amount: parseInt(this.iznos,10),
        date: this.datetime.substring(0,10),
        paid: this.pom,
        kindergartenName: kindergarten
        
        
      };
      console.log(data.billType);
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
    );*/
  }
  deleteClick() {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '350px',
        height: '200px',
      })
      .afterClosed()
      .subscribe(() => {
        this.load();
      });
  }
}
