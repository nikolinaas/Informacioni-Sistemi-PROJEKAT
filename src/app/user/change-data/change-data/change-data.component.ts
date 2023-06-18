import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateChildComponent } from 'src/app/children/create-child-dialog/create-child/create-child.component';
import { ChildrenService } from 'src/app/children/services/children.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.css']
})
export class ChangeDataComponent {

  public form: any;

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(sessionStorage.getItem('username'), Validators.required),
      password1: new FormControl(sessionStorage.getItem('password'), Validators.required),
      password2: new FormControl(sessionStorage.getItem('password'), Validators.required),
    });
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private params: any,
    private dialogRef: MatDialogRef<CreateChildComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }

  changeCredentials() {
    if (this.form.valid) {
      if (this.form.value.password1 === this.form.value.password2) {
        const data = {
          userName: this.form.value.username,
          password: this.form.value.password1,
        };
        if (this.params.isAdmin) {
          this.userService
            .updateAdminCredentials(data, this.params.id)
            .subscribe((response: any) => {
              this.snackBar.open(
                'Uspješno ste ažurirali kredencijale',
                undefined,
                {
                  duration: 2000,
                }
              );
              sessionStorage.setItem('password', data.password);
              sessionStorage.setItem('username', data.userName);
              this.dialogRef.close();
            });
        } else {
          this.userService
            .updateEducatorCredentials(data, this.params.id)
            .subscribe((response: any) => {
              this.snackBar.open(
                'Uspješno ste ažurirali kredencijale',
                undefined,
                {
                  duration: 2000,
                }
              );
              sessionStorage.setItem('password', data.password);
              sessionStorage.setItem('username', data.userName);
              this.dialogRef.close();
            });
        }

      } else {
        this.snackBar.open('Lozinke se ne podudaraju!', '', {
          duration: 2000,
        });
      }
    }
  }
}

