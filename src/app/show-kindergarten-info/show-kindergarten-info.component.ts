import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isButtonEnabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private kindergartenService: KindergartenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.kindergartenService.getInfo().subscribe((kindergarten: any) => {
      this._kindergarten = kindergarten;
      if(this._kindergarten) {
        this.form.patchValue(this._kindergarten);
        if(this._kindergarten.address)
          this.form.patchValue(this._kindergarten.address);
      }
    });
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
      return 'Obavezno polje';
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
      });
  }

  enableButton() {
    this.isButtonEnabled = true;
  }
}
