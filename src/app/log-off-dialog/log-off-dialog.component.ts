import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-off-dialog',
  templateUrl: './log-off-dialog.component.html',
  styleUrls: ['./log-off-dialog.component.css'],
})
export class LogOffDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<LogOffDialogComponent>,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  redirectToLogin() {
    // TODO UKOLIKO KORISNIK ZELI DA SE ODJAVI POTREBNO GA JE REDIREKTOVATI NA LOGIN STRANICU
    // U ZAVISNOSTI OD TOGA KOJA CE BITI LOGIN PUTANJA I EVENTUALNO POSTAVITI NULL NA PRIJAVLJENOG KORISNIKA
    // UKOLIKO SE BUDE RADILO NA TAJ NACIN (MOZDA JE DOBRO IMATI LOGIN SERVICE KOJI CE CUVATI INFROMACIJE 
    // O PRIJAVLJENOM KORISNIKU NA JEDNOM MJESTU)
    //this.router.navigate(['']);
  }
}
