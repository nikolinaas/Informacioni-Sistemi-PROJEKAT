import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  public form: FormGroup = new FormGroup({});
  private _dateToFind?: string;
  selectedFileMedicalClearance: File | undefined;
  selectedFileHygieneTest: File | undefined;
  byteArrayMedicalClearance: any | undefined;
  byteArrayHygieneTest: any | undefined;

  educator: any = {
    name: '',
    surname: '',
    uid: '',
    dateOfBirth: '',
    id: '',
    address: '',
    userName: '',
    password: '',
    salary: '',
    idGroup: '',
    medicalClearance: '',
    hygieneTest: '',
  };

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
    if (this.educator.name != '' && this.educator.surname != '') {
      // TODO PROVJERITI TODO IZ CreateChildComponent-e
      const date: string = '';
      const data = {
        name: this.educator.name,
        surname: this.educator.surname,
        uid: this.educator.uid,
        dateOfBirth: this._dateToFind,
        city: this.educator.city,
        street: this.educator.street,
        number: this.educator.number + '',
        // address: {city: this.educator.city, street: this.educator.street, number: (this.educator.number+'')},
        userName: this.educator.username,
        password: this.educator.password,
        medicalClearance: this.byteArrayMedicalClearance,
        hygieneTest: this.byteArrayHygieneTest,
      };
      console.log(this.educator.dateOfBirth);
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
            'Nije moguće kreirati nalog za vasptača!' + date,
            undefined,
            {
              duration: 2000,
            }
          );
        }
      );
    }
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
        console.log('Ljekarski', this.byteArrayMedicalClearance);
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
        console.log('Higijenski', this.byteArrayHygieneTest);
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
}
