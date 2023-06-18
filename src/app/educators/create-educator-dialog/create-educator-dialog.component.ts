import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EducatorsService } from '../service/educators.service';

const moment = _moment;

@Component({
  selector: 'app-create-educator-dialog',
  templateUrl: './create-educator-dialog.component.html',
  styleUrls: ['./create-educator-dialog.component.css'],
})
export class CreateEducatorDialogComponent {
  date = moment();
  today: Date = new Date();
  passwordVisible: boolean = false;
  passwordRepeatVisible: boolean = false;

 
  private _dateToFind?: string;
  selectedFileMedicalClearance: File | undefined;
  selectedFileHygieneTest: File | undefined;
  byteArrayMedicalClearance: any | undefined;
  byteArrayHygieneTest: any | undefined;

  
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateEducatorDialogComponent>,
    private educatorService: EducatorsService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog() {
    this.dialogRef.close();
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

  createEducator() {
    
      if (this.form.valid === false || this.byteArrayMedicalClearance == null || this.byteArrayHygieneTest == null) {
        this.snackBar.open('Molimo Vas da popunite sva obavezna polja.', undefined, {
          duration: 2000,
        });
      }
      else if(this._dateToFind == null){
          
      this.snackBar.open('Molimo Vas unesite datum rođenja!', undefined, {
        duration: 2000,
      });
      }else if(this.form.value.uid.length !=13){
        this.snackBar.open('JMBG mora imati 13 karaktera!', undefined, {
          duration: 2000,
        });
      }else if(this.form.value.password !== this.form.value.passwordRepeat){
        this.snackBar.open('Lozinke se ne poklapaju. Molimo Vas unesite ponovo!', undefined, {
          duration: 2000,
        });
      }
      else{
        const date: string = '';
        const data = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        uid: this.form.value.uid,
        dateOfBirth: this._dateToFind,
        city: this.form.value.city,
        street: this.form.value.street,
        number: this.form.value.number + "",
        userName: this.form.value.userName,
        password: this.form.value.password,
        medicalClearance: this.byteArrayMedicalClearance,
        hygieneTest: this.byteArrayHygieneTest,
        phoneNumber: this.form.value.phoneNumber
      };

     
      this.educatorService.createEducator(data).subscribe(
        (response: any) => {
          if (response.status == 201) {
            this.snackBar.open(
              'Uspjesno ste kreirali nalog za vaspitača! ',
              undefined,
              {
                duration: 2000,
              }
            );
            this.dialogRef.close(true);
          }
        },
        () => {
          this.snackBar.open(
            'Nije moguće kreirati nalog za vaspitača!',
            undefined,
            {
              duration: 2000,
            }
          );
        }
      );
    } 
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }

  onMedicalFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileMedicalClearance = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        this.byteArrayMedicalClearance = Array.from(uint8Array);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  onHygieneFileSelected(event: any) {
    const file1: File = event.target.files[0];
    this.selectedFileHygieneTest = file1;
    if (file1) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        this.byteArrayHygieneTest = Array.from(uint8Array);
      };
      reader.readAsArrayBuffer(file1);
    }
  }

  openFileChooser1() {
    const fileInput: HTMLElement = document.querySelector(
      '#fileInputMedicalClearance'
    ) as HTMLElement;
    fileInput.click();
  }

  openFileChooser2() {
    const fileInput: HTMLElement = document.querySelector(
      '#fileInputHygieneTest'
    ) as HTMLElement;
    fileInput.click();
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'passwordRepeat') {
      this.passwordRepeatVisible = !this.passwordRepeatVisible;
    }
  }
}
