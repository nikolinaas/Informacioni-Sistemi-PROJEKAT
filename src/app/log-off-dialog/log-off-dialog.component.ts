import { Component } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { CreateGroupDialogComponent } from '../home/create-group-dialog/create-group-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-off-dialog',
  templateUrl: './log-off-dialog.component.html',
  styleUrls: ['./log-off-dialog.component.css'],
})
export class LogOffDialogComponent {
  faRemove = faRemove;

  constructor(
    private dialogRef: MatDialogRef<LogOffDialogComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  redirectToLogin() {
    console.log("DA");
    // TODO UKOLIKO KORISNIK ZELI DA SE ODJAVI POTREBNO GA JE REDIREKTOVATI NA LOGIN STRANICU
    // U ZAVISNOSTI OD TOGA KOJA CE BITI LOGIN PUTANJA I EVENTUALNO POSTAVITI NULL NA PRIJAVLJENOG KORISNIKA
    // UKOLIKO SE BUDE RADILO NA TAJ NACIN (MOZDA JE DOBRO IMATI LOGIN SERVICE KOJI CE CUVATI INFROMACIJE 
    // O PRIJAVLJENOM KORISNIKU NA JEDNOM MJESTU)
    //this.router.navigate(['']);
  }
}
