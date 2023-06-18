import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ChildService } from 'src/app/evidence/services/child.service';
import { Child } from 'src/app/model/child.model';
import * as _moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembershipService } from '../services/membership.service';
const moment = _moment;

@Component({
  selector: 'app-create-membership-dialog',
  templateUrl: './create-membership-dialog.component.html',
  styleUrls: ['./create-membership-dialog.component.css'],
})
export class CreateMembershipDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  private _children: Child[] = [];
  private _month?: string;
  private _paymentDate?: string;

  monthCB: string = '';
  today: Date = new Date();
  date = moment();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateMembershipDialogComponent>,
    private childService: ChildService,
    private snackBar: MatSnackBar,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      child: [null, Validators.required],
      serviceType: [null, Validators.required],
      amount: [null, Validators.required],
      month: [null, Validators.required],
      paid: [null, Validators.required],
      date: [null],
    });

    this.childService.getChildren().subscribe((response: any) => {
      this._children = response;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createMembership(form: any) {
    const child = {
      id: form.get('child').value,
    };
    const membership = {
      serviceType: form.get('serviceType').value,
      child: child,
      amount: form.get('amount').value,
      date: this._month,
      paid: form.get('paid').value === "Da"? true: false,
      paymentDate: form.get('date').value ? this._paymentDate : "0001-01-01",
    };
    this.membershipService
      .createMembership(membership)
      .subscribe((response: any) => {
        if (response.status == 201) {
          this.snackBar.open('Uspješno ste kreirali članarinu.', '', {
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
      this._paymentDate =
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

  get children() {
    return this._children;
  }
}
