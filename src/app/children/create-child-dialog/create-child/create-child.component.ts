import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChildrenService } from './../../services/children.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Child } from 'src/app/model/child.model';
import { Address } from 'src/app/model/address.model';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = _moment;


@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
  styleUrls: ['./create-child.component.css']
})
export class CreateChildComponent {

  date = moment();
  public form: FormGroup = new FormGroup({});
  private _dateToShow?: string;
  private _dateToFind?: string;
  child: any = {
    name: '', 
    surname: '', 
    uid: '', 
    dateOfBirth: '', 
    motherName: '', 
    fatherName: '', 
    motherPhoneNumber: '', 
    fatherPhoneNumber: '', 
    height: '', 
    weight: '',
    note: '',
    city: '',
    street: '',
    number: '',
    id: '',
    isHere: '',
    arrivalAndDepartureTime: '',
    medicalClearance: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateChildComponent>,
    private childrenService: ChildrenService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog(){
    this.dialogRef.close();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      this.date = moment(event.value);
      this._dateToShow = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
      this._dateToFind = this.date.format('YYYY') + "-" + this.date.format('MM') + "-" + this.date.format('DD');

    }
  }

  createChild() {
    if (this.child.name !='' || this.child.surname !='') {
      const date: string='';
      const data = {
        name: this.child.name,
        surname: this.child.surname,
        uid: this.child.uid,
        dateOfBirth: this._dateToFind,
        motherName: this.child.motherName,
        fatherName: this.child.fatherName,
        motherPhoneNumber: this.child.motherPhoneNumber,
        fatherPhoneNumber: this.child.fatherPhoneNumber,
        height: this.child.height+'',
        weight: this.child.weight+'',
        note: { description: this.child.note},
        address: {city: this.child.city, street: this.child.street, number: (this.child.number+'')},
        medicalClearance: this.byteArray
        
      };
      console.log(data.medicalClearance);
      this.childrenService.createChild(data).subscribe(
        (response: any) => {
          if (response.status == 201) {
            this.snackBar.open('Uspjesno ste kreirali dijete ', '', {
              duration: 2000,
            });
            this.dialogRef.close(true);
          }
        },
        () => {
          this.snackBar.open(
            'Nije moguće kreirati dijete!'+date,
            '',
            {
              duration: 2000,
            }
          );
        }
      );
    }
  }

  selectedFile: File | undefined;
  byteArray: any | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile=file;
    if (file) {
      console.log(file);

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        this.byteArray = Array.from(uint8Array);
      };
      reader.readAsArrayBuffer(file);
      console.log(this.byteArray);
    }
  }

  openFileChooser() {
    const fileInput: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

}
