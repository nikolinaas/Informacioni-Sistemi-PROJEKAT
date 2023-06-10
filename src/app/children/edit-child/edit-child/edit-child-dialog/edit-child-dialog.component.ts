import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/children/services/children.service';

@Component({
  selector: 'app-edit-child-dialog',
  templateUrl: './edit-child-dialog.component.html',
  styleUrls: ['./edit-child-dialog.component.css']
})
export class EditChildDialogComponent {

  public form: FormGroup = new FormGroup({});
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: any,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private childrenService: ChildrenService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditChildDialogComponent>
    ) {

  }
  getErrorMessage(text?:string){
    // TODO OBRISATI OVU METODU AKO NE TREBA
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeData(){
    const  formData = this.form.value;
    const data = {
      name:  formData.name, 
      surname:  formData.surname, 
      uid:  formData.uid, 
      dateOfBirth:  formData.dateOfBirth, 
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
        //this.childrenService.kindergarten = response; // TODO OBRISATI OVO AKO NE TREBA
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
    // TODO OVDE JE PROBLEM STO CE SE PORUKA ZA USPJESNO AZURIRANJE LJEKARKSOG UVJERENJA PRIKAZATI
    // PRIJE NEGO STO KORISNIK PRITISNE NA DUGME 'SACUVAJ'
    // A TREBA DA SE DESI OBRNUTO, DAKLE AKO AZURIRA LJEKARSKO UVJERENJE ON TREBA DA GA IZABERE
    // I DA ONDA PRITISNE NA DUGME SACUVAJ, NAKON CEGA CE MU SE PRIKAZATI PORUKA DA JE USPJESNO AZURIRANO
    const file: File = event.target.files[0];
    this.selectedFile=file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const byteArray = Array.from(uint8Array);
        const fileJSON = {medicalClearance: byteArray};
        console.log(fileJSON.medicalClearance);//
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
      };
      reader.readAsArrayBuffer(file);
    }
  }

  openFileChooser() {
    const fileInput: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }
}
