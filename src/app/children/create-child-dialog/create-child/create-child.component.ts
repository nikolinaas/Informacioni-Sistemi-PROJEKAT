import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChildrenService } from './../../services/children.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = _moment;

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
  styleUrls: ['./create-child.component.css'],
})
export class CreateChildComponent {
  date = moment();
  private _dateToFind?: string;
  today: Date = new Date();

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    uid: new FormControl('',[
      Validators.required,
      Validators.minLength(13), 
      Validators.maxLength(13), 
    ]),
    dateOfBirth: new FormControl('', Validators.required),
    motherName: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    motherPhoneNumber: new FormControl('', Validators.required),
    fatherPhoneNumber: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    note: new FormControl(''),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<CreateChildComponent>,
    private childrenService: ChildrenService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  getErrorMessage(controlName:string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }else if(control?.hasError('minLength')){
      return 'Mora sadrzavati 13 karaktera!';
    }else if(control?.hasError('maxLength')){
      return 'Mora sadrzavati 13 karaktera!';
    }
    return '';
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

  createChild() {
    if (this.byteArray != null) {
      const date: string = '';
      const data = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        uid: this.form.value.uid,
        dateOfBirth: this._dateToFind,
        motherName: this.form.value.motherName,
        fatherName: this.form.value.fatherName,
        motherPhoneNumber: this.form.value.motherPhoneNumber,
        fatherPhoneNumber: this.form.value.fatherPhoneNumber,
        height: this.form.value.height + '',
        weight: this.form.value.weight + '',
        note: { description: this.form.value.note },
        address: {
          city: this.form.value.city,
          street: this.form.value.street,
          number: this.form.value.number + '',
        },
        medicalClearance: this.byteArray,
      };

      this.childrenService.createChild(data).subscribe(
        (response: any) => {
          if (response.status == 201) {
            this.snackBar.open('Uspjesno ste kreirali nalog za dijete ', '', {
              duration: 2000,
            });
            this.dialogRef.close(true);
          }
        },
        () => {
          this.snackBar.open('Nije moguće kreirati nalog za dijete!', '', {
            duration: 2000,
          });
        }
      );
    }else{
      this.snackBar.open('Molimo popunite sva obavezna polja.', undefined, {
        duration: 2000,
      });
    }
  }

  selectedFile: File | undefined;
  byteArray: any | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        this.byteArray = Array.from(uint8Array);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  openFileChooser() {
    const fileInput: HTMLElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLElement;
    fileInput.click();
  }
}
