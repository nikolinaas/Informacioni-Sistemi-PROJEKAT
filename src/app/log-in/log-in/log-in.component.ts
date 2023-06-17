import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/data-sharing.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  isLog: boolean = false;

  public form: FormGroup = new FormGroup({});
  private _hidePassword = true;
  private sessionStorageKey: string = 'auth';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public login(form: any) {
    const credentials = {
      username: form.get('username').value,
      password: form.get('password').value,
    };
    this.loginService.login(credentials).subscribe((response: any) => {
      if (response.body && response.body.statusCode == 403) {
        this.snackBar.open('Pogrešno korisničko ime i/ili lozinka', undefined, {
          duration: 2000,
        });
      } else if (response.status == 200) {
        console.log(response.body.account);
        const sharedData = {
          id: response.body.account.idPerson, 
          isAdmin: response.body.account.administrator,
          username: form.get('username').value,
          password: form.get('password').value
        };
        this.dataSharingService.setSharedData(sharedData);
        this.router.navigate(['groups']);
        sessionStorage.setItem(this.sessionStorageKey, response.body.token);
        this.isLog = true;
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  togglePasswordVisibility() {
    this._hidePassword = !this._hidePassword;
  }

  get hidePassword() {
    return this._hidePassword;
  }
}
