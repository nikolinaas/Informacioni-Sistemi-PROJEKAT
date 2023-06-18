import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { BillService } from '../services/bill.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = _moment;

@Component({
  selector: 'app-create-bill-dialog',
  templateUrl: './create-bill-dialog.component.html',
  styleUrls: ['./create-bill-dialog.component.css'],
})
export class CreateBillDialogComponent implements OnInit{

  public form: FormGroup = new FormGroup({});
  
  private _month?: string;

  date = moment();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateBillDialogComponent>,
    private snackBar: MatSnackBar,
    private billService: BillService
  ) {}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      billNumber: [null, Validators.required],
      billType: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      paid: [null, Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createBill(form: any) {
    const bill = {
      billNumber: form.get('billNumber').value,
      billType: form.get('billType').value,
      amount: form.get('amount').value,
      date: this._month,
      paid: form.get('paid').value === "Da"? true: false,
    }
    this.billService.createBill(bill).subscribe((response: any) => {
      if(response.body && response.body.statusCode == 409) {
        this.snackBar.open('Broj računa mora biti jedinstven.', '', {
          duration: 2000,
        });
        this.dialogRef.close();
      } else if(response.status == 201) {
        this.snackBar.open('Uspješno ste kreirali račun.', '', {
          duration: 2000,
        });
        this.dialogRef.close('success');
      }
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      this.date = moment(event.value);
      this._month =
        this.date.format('YYYY') +
        '-' +
        this.date.format('MM') +
        '-' +
        this.date.format('DD');
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    } else {
      return '';
    }
  }
}
