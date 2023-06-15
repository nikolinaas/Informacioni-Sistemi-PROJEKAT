import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent {
  public form: FormGroup = new FormGroup({});
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private params: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangeCredentialsComponent>,
    private formBuilder: FormBuilder,
    ) {

  }
  getErrorMessage(text?:string) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName:  [''],
      password: [''],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeData(){
    const  formData = this.form.value;
    const data = {
      userName:  formData.userName, 
      password:  formData.password, 
    };
  
    this.userService
    if(this.params.isAdmin === true){
      this.userService.updateAdminCredentials(data, this.params?.id)
      .subscribe((response: any) => {
        this.snackBar.open(
          'Uspješno ste ažurirali kredencijale',
          undefined,
          {
            duration: 2000,
          }
        );
        this.dialogRef.close();
      });
    }else{
      this.userService.updateEducatorCredentials(data, this.params?.id)
      .subscribe((response: any) => {
        this.snackBar.open(
          'Uspješno ste ažurirali kredencijale',
          undefined,
          {
            duration: 2000,
          }
        );
        this.dialogRef.close();
      });
    }
  }
}
