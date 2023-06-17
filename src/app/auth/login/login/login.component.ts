import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({});
  private _hidePassword = true;
  private sessionStorageKey: string = 'auth';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
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
      if (response.status == 200) {
        this.router.navigate(['groups']);
        sessionStorage.setItem(this.sessionStorageKey, response.token);
      } else if (response.statusCode == 403) {
        this.snackBar.open(response.message, undefined, {
          duration: 2000,
        });
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
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
