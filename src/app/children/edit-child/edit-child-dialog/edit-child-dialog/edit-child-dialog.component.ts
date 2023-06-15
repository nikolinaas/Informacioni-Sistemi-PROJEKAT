import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import { ChildrenService } from 'src/app/children/services/children.service';
const moment = _moment;
@Component({
  selector: 'app-edit-child-dialog',
  templateUrl: './edit-child-dialog.component.html',
  styleUrls: ['./edit-child-dialog.component.css']
})
export class EditChildDialogComponent {

  public form: FormGroup = new FormGroup({});
  data: any;
  birthday: Date = new Date();
  date = moment();
  today: Date = new Date();
  private _dateToFind?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: any,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private childrenService: ChildrenService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditChildDialogComponent>
    ) {

  }
  getErrorMessage(errorMsg:string){
    const control = this.form.get(errorMsg);
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

  changeData(){
    const formData = this.form.value;
    if(this._dateToFind == null){
      this.date = moment(this.birthday);
      this._dateToFind =  this.date.format('YYYY') + '-' + this.date.format('MM') + '-' + this.date.format('DD');
    }
    const data = {
      name:  formData.name, 
      surname:  formData.surname, 
      uid:  formData.uid, 
      dateOfBirth:  this._dateToFind, 
      motherName:  formData.motherName, 
      fatherName:  formData.fatherName, 
      motherPhoneNumber:  formData.motherPhoneNumber, 
      fatherPhoneNumber:  formData.fatherPhoneNumber, 
      height:  formData.height, 
      weight:  formData.weight,
      note: { description: formData.description},
      address: {city: formData.city, street: formData.street, number: formData.number},
      isHere:  formData.isHere,
      arrivalAndDepartureTime:  formData.arrivalAndDepartureTime,
      medicalClearance:  formData.formDatamedicalClearance
    };
  
    this.updateFile();
    this.childrenService
      .updateChild(data, this.id)
      .subscribe((response: any) => {
        this.snackBar.open(
          'Uspješno ste ažurirali podatke o djetetu',
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

  fillData(){  
    this.form = this.formBuilder.group({
      name:  [''],
      surname: [''],
      uid: [''],
      dateOfBirth: [''],
      motherName: [''],
      fatherName: [''],
      motherPhoneNumber: [''],
      fatherPhoneNumber: [''],
      city: [''],
      street: [''],
      number: [''],
      height: [''],
      weight: [''],
      description: [''],    
     });
    this.childrenService.getChild(this.id).subscribe((response: HttpResponse<any>) => {
      this.data = response.body; 
      this.form.patchValue(this.data);
      this.form.patchValue(this.data.address);
      this.form.patchValue(this.data.note);                  
    });
  }

  selectedFile: File | undefined;
  byteArray: any | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile=file;
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

  updateFile() {
    if(this.selectedFile != undefined) {
      const fileJSON = {medicalClearance: this?.byteArray};
          this.childrenService
          .updateFile(fileJSON, this.id)
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

  openFileChooser() {
    const fileInput: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }
}
