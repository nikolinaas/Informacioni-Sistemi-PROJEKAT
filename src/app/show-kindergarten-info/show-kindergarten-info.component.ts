import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { KindergartenService } from './services/kindergarten.service';
import { Kindergarten } from '../model/kindergarten.model';

@Component({
  selector: 'app-show-kindergarten-info',
  templateUrl: './show-kindergarten-info.component.html',
  styleUrls: ['./show-kindergarten-info.component.css'],
})
export class ShowKindergartenInfoComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  private _kindergarten?: Kindergarten;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ShowKindergartenInfoComponent>,
    private kindergartenService: KindergartenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._kindergarten = this.kindergartenService.kindergarten;
    this.form = this.formBuilder.group({
      city: [this._kindergarten?.address?.city, Validators.required],
      street: [this._kindergarten?.address?.street, Validators.required],
      number: [this._kindergarten?.address?.number, Validators.required],
      phoneNumber: [this._kindergarten?.phoneNumber, Validators.required],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  changeData() {
    const formData = this.form.value;
    const address = {
      street: formData.street,
      number: formData.number,
      city: formData.city,
    };
    const kindergarten = {
      name: this._kindergarten?.name,
      phoneNumber: formData.phoneNumber,
      address: address,
    };

    this.kindergartenService
      .updateData(kindergarten)
      .subscribe((response: any) => {
        this.snackBar.open(
          'Uspješno ste ažurirali podatke o vrtiću',
          undefined,
          {
            duration: 2000,
          }
        );
        this.kindergartenService.kindergarten = response;
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
