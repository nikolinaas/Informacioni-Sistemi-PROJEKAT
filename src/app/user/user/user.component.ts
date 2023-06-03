import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/children/services/children.service';
import { ChangeCredentialsComponent } from '../change-credentials/change-credentials/change-credentials.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public form: FormGroup = new FormGroup({});
  data?: any;
  id: number=3; //id treba da se kupi iz app-component komponente
  isAdmin: boolean=true; // isAdmin  treba da se kupi iz app-component komponente
  // prosljedjuje se objekat tipa const data = {id:number, isAdmin:boolean}
 

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //    this.id = params['id'];
    // });   
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
     });

    if(this.isAdmin){
      this.userService.getAdminData(this.id).subscribe((response: HttpResponse<any>) => {
        this.data = response.body; 
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
    }else{
      this.userService.getEducatorData(this.id).subscribe((response: HttpResponse<any>) => {
        this.data = response.body; 
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
    }             
    

   
  }


  getErrorMessage(errosMsg:any){

  }

  changeCredentials(){
      this.dialog
        .open(ChangeCredentialsComponent, {
        width: '400px',
        data: {id: this.id, isAdmin: this.isAdmin}
      })
        .afterClosed()
        .subscribe(() => {
        this.fillData();
      });
  }

  

}
