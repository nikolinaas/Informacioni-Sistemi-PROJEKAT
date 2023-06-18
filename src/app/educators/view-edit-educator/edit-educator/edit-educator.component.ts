import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EducatorsService } from '../../service/educators.service';
import { HttpResponse } from '@angular/common/http';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = _moment;

@Component({
  selector: 'app-edit-educator',
  templateUrl: './edit-educator.component.html',
  styleUrls: ['./edit-educator.component.css'],
})
export class EditEducatorComponent {
  public form: FormGroup = new FormGroup({});
  data: any;
  date = moment();
  today: Date = new Date();
  private _dateToFind?: string;
  birthday: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: any,
    private formBuilder: FormBuilder,
    private educatorsService: EducatorsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditEducatorComponent>
  ) {}
  
  getErrorMessage(errosMsg: any) {
    const control = this.form.get(errosMsg);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }

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

  changeData() {
    const formData = this.form.value;
    if(this._dateToFind == null){
      this.date = moment(this.birthday);
      this._dateToFind =  this.date.format('YYYY') + '-' + this.date.format('MM') + '-' + this.date.format('DD');
    }
    const data = {
      id: this.id,
      name: formData.name,
      surname: formData.surname,
      uid: formData.uid,
      dateOfBirth: this._dateToFind,
      address: {
        city: formData.city,
        street: formData.street,
        number: formData.number,
      },
      phoneNumber: formData.phoneNumber,
      medicalClearance: formData.formDatamedicalClearance,
      hygieneTest: formData.formDatahygieneTest,
    };
    this.updateMedicalFile();
    this.updateHygieneFile();
    this.educatorsService
      .updateEducator(data, this.id)
      .subscribe((response: any) => {
        this.snackBar.open(
          'Uspješno ste ažurirali podatke o vaspitaču',
          undefined,
          {
            duration: 2000,
          }
        );
        this.dialogRef.close();
      });
  }

  ngOnInit() {
    this.fillData();
  }
  fillData() {
    this.form = this.formBuilder.group({
      name: [''],
      surname: [''],
      uid: [''],
      city: [''],
      street: [''],
      number: [''],
      userName: [''],
      password: [''],
      phoneNumber: ['']
    });

    this.educatorsService
      .getEducator(this.id)
      .subscribe((response: HttpResponse<any>) => {
        this.data = response.body;
        this.birthday = moment(this.data.dateOfBirth).toDate();
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
  }
  selectedFileMedicalClearance: File | undefined;
  selectedFileHygieneTest: File | undefined;
  byteArrayMedicalClearance: any | undefined;
  byteArrayHygieneTest: any | undefined;

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
  updateMedicalFile() {
    if(this.selectedFileMedicalClearance != undefined) {
      const fileJSON = {medicalClearance: this?.byteArrayMedicalClearance};
          this.educatorsService
          .updateMedicalFile(fileJSON, this.id)
          .subscribe((response: any) => {
            this.snackBar.open(
              'Uspješno ste ažurirali ljekarsko uvjerenje',
              undefined,
              {
                duration: 2000,
              }
            );
          });
        }
  }

  onHygieneFileSelected(event: any) {
 
    const file: File = event.target.files[0];
    this.selectedFileHygieneTest = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        this.byteArrayHygieneTest = Array.from(uint8Array);  
      };
      reader.readAsArrayBuffer(file);
    }
  }

  updateHygieneFile() {
    if(this.selectedFileHygieneTest != undefined) {
      const fileJSON = {hygieneTest: this?.byteArrayHygieneTest};
          this.educatorsService
          .updateHygieneFile(fileJSON, this.id)
          .subscribe((response: any) => {
            this.snackBar.open(
              'Uspješno ste ažurirali higijenski test',
              undefined,
              {
                duration: 2000,
              }
            );
          });
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
