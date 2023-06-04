import { HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Child } from 'src/app/model/child.model';
import { ShowKindergartenInfoComponent } from 'src/app/show-kindergarten-info/show-kindergarten-info.component';
import { ChildrenService } from '../../services/children.service';
import { EditChildDialogComponent } from '../edit-child-dialog/edit-child-dialog/edit-child-dialog.component';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent {
  public form: FormGroup = new FormGroup({});
  data?: any;
  id: number=0;
 // @Input() name: any;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private childrenService: ChildrenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = params['id'];
    });   
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


  getErrorMessage(errosMsg:any){

  }

  changeData(){
    
  }

  enableEdit(){
    this.dialog
      .open(EditChildDialogComponent, {
        width: '500px',
        data: this.id
      })
      .afterClosed()
      .subscribe(() => {
        this.fillData();
      });
  }
  
  openFile(){
    this.childrenService.getFile(this.id).subscribe((response: ArrayBuffer) => {
      this.regenerateFile(response);
    });
  }

  regenerateFile(byteArray: ArrayBuffer): void {
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const fileUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = this.data.name+'_ljekarsko.pdf';
    link.click();
  }

}


