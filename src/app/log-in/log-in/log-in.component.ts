import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      if (response.body && response.body.statusCode == 403) {
        this.snackBar.open('Pogrešno korisničko ime i/ili lozinka', undefined, {
          duration: 2000,
        });
      } else if (response.status == 200) {
        this.router.navigate(['groups']);
        sessionStorage.setItem(this.sessionStorageKey, response.token);
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
