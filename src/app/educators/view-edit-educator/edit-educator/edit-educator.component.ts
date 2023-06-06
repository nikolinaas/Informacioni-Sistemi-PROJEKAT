import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EducatorsService } from '../../service/educators.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-educator',
  templateUrl: './edit-educator.component.html',
  styleUrls: ['./edit-educator.component.css']
})

export class EditEducatorComponent {
  public form: FormGroup = new FormGroup({});
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: any,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private educatorsService: EducatorsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditEducatorComponent>
    ) {

  }
  getErrorMessage(text?:string){
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeData(){
    const  formData = this.form.value;
    const data = {
      id: this.id,
      name:  formData.name, 
      surname:  formData.surname, 
      uid:  formData.uid, 
      dateOfBirth:  formData.dateOfBirth, 
      address: {city: formData.city, street: formData.street, number: formData.number},
      medicalClearance:  formData.formDatamedicalClearance,
      hygieneTest: formData.formDatahygieneTest
    };
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
  fillData(){  
    this.form = this.formBuilder.group({
      name:  [''],
      surname: [''],
      uid: [''],
      dateOfBirth: [''],
      city: [''],
      street: [''],
      number: [''],
      userName: [''],
      password: ['']
    });
  
    this.educatorsService.getEducator(this.id).subscribe((response: HttpResponse<any>) => {
      this.data = response.body; 
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
    this.selectedFileMedicalClearance=file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const byteArray = Array.from(uint8Array);
        const fileJSON = {medicalClearance: byteArray};
        console.log(fileJSON.medicalClearance);//
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
      };
      reader.readAsArrayBuffer(file);
    }
  }

  onHygieneFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileHygieneTest=file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const byteArray = Array.from(uint8Array);
        const fileJSON = {hygieneTest: byteArray};
        console.log(fileJSON.hygieneTest);
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
      };
      reader.readAsArrayBuffer(file);
    }
  }

  openFileChooser1() {
    const fileInput: HTMLElement = document.querySelector('#fileInputMedicalClearance') as HTMLElement;
    fileInput.click();
  }
  openFileChooser2() {
    const fileInput: HTMLElement = document.querySelector('#fileInputHygieneTest') as HTMLElement;
    fileInput.click();
  }

}