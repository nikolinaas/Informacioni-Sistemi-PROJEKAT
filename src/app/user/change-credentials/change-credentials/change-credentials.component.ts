import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { HttpResponse } from '@angular/common/http';
const moment = _moment;
@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent {
  public form: FormGroup = new FormGroup({});
  data: any;
  birthday: Date = new Date();
  date = moment();
  private _dateToFind?: string;
  today: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) private params: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangeCredentialsComponent>,
    private formBuilder: FormBuilder,
    ) {

  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      this.date = moment(event.value);
      this._dateToFind =
        this.date.format('YYYY') +
        '-' +
        this.date.format('MM') +
        '-' +
        this.date.format('DD');
    }
  }

  ngOnInit() {
    this.fillData();
    
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} | null => {
    const password1 = control.get('password')?.value;
    const password2 = control.get('password2')?.value;

    return password1 === password2 ? null : { passwordMismatch: true };
  };


  closeDialog() {
    this.dialogRef.close();
  }

  changeData(){
    const  formData = this.form.value;
    const data = {
      name:  formData.name, 
      surname:  formData.surname, 
      uid:  formData.uid,
      dateOfBirthday:  formData._dateToFind,
      city:  formData.city,
      street: formData.street,
      number: formData.number,

    };
  
    this.userService.updateAdminData(data, this.params?.id)
    .subscribe((response: any) => {
      this.snackBar.open(
        'Uspješno ste ažurirali podatke',
        undefined,
        {
          duration: 2000,
        }
      );
      this.dialogRef.close();
      this.fillData();
    });
  }


  fillData(){  
    this.form = this.formBuilder.group({
      name:  [''],
      surname: [''],
      uid: [''],
      dateOfBirth: [''],
      city: [''],
      street: [''],
      number: [''],  
     });

      this.userService.getAdminData(this.params.id).subscribe((response: HttpResponse<any>) => {
        this.data = response.body; 
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
    });
  }

  getErrorMessage(errorMsg:string){
    const control = this.form.get(errorMsg);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }
}
