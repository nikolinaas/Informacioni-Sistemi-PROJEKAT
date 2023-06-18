import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/children/services/children.service';
import { ChangeCredentialsComponent } from '../change-credentials/change-credentials/change-credentials.component';
import { UserService } from '../services/user.service';
import { ChangeDataComponent } from '../change-data/change-data/change-data.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public form: FormGroup = new FormGroup({});
  data?: any;
  userData: any;
 

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.updateStorageData();
    this.fillData();
  }

  updateStorageData(){
    this.userData = {
      isAdmin: sessionStorage.getItem('isAdmin') === 'true'? true:false,
      id: sessionStorage.getItem('id'),
      password: sessionStorage.getItem('password'),
      username: sessionStorage.getItem('username')
    };
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
     });

    if(this.userData.isAdmin){
      this.userService.getAdminData(this.userData.id).subscribe((response: HttpResponse<any>) => {
        this.data = response.body; 
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
    }else{
      this.userService.getEducatorData(this.userData.id).subscribe((response: HttpResponse<any>) => {
        this.data = response.body; 
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
    }             
    

   
  }


  getErrorMessage(errosMsg:any){

  }

  changeCredentials() {
      this.dialog
        .open(ChangeDataComponent, {
        width: '400px',
        data: {
          id: this.userData.id,
          username: this.userData.password,
          password: this.userData.password,
          isAdmin: this.userData.isAdmin
        }
      })
        .afterClosed()
        .subscribe(() => {
        this.fillData();
        this.updateStorageData();
      });
    
  }

  changeData(){ 
    this.dialog
      .open(ChangeCredentialsComponent, {
      width: '600px',
      data: {
        id: this.userData.id,
        username: this.userData.password,
        password: this.userData.password,
        isAdmin: this.userData.isAdmin}
      })
      .afterClosed()
      .subscribe(() => {
      this.fillData();
    });

  }

  

}
