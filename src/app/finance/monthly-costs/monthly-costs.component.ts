import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill.model';
import { BillService } from '../services/bill.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateBillDialogComponent } from '../create-bill-dialog/create-bill-dialog.component';

@Component({
  selector: 'app-monthly-costs',
  templateUrl: './monthly-costs.component.html',
  styleUrls: ['./monthly-costs.component.css'],
})
export class MonthlyCostsComponent implements OnInit {

  private _bills: Bill[] = [];

  columns = [
    'Broj računa',
    'Vrsta računa',
    'Iznos',
    'Datum',
    'Plaćeno',
    'Obriši račun',
  ];

  constructor(
    private billService: BillService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.billService.getBills().subscribe((response: any) => {
      this._bills = response;
    });
  }

  createBill() {
    const dialogRef: MatDialogRef<CreateBillDialogComponent> = this.dialog.open(CreateBillDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }

  changeStatus(bill: Bill) {
    this.billService.updateBill(bill.billNumber).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteBill(bill: Bill) {
    this.billService.deleteBill(bill.billNumber).subscribe(() => {
      this.ngOnInit();
    });
  }

  get bills() {
    return this._bills;
  }
}
