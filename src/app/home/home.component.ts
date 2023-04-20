import { Component } from '@angular/core';
import { GroupService } from './services/group.service';
import { Group } from '../model/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private _groups?: Group[];

  faRemove = faRemove;
  faAdd = faAdd;

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups().subscribe((groups: any) => {
      this._groups = groups;
    });
  }

  createGroup() {
    this.dialog
      .open(CreateGroupDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getGroups();
      });
  }

  deleteGroup(groupId?: number): void {
    const group = this._groups?.find((g) => g.id === groupId);
    if (group?.numberOfMembers != 0) {
      this.snackBar.open(
        'Broj clanova grupe mora da bude 0 da bi grupa bila obrisana.',
        undefined,
        {
          duration: 2000,
        }
      );
    } else {
      this.groupService.deleteGroup(groupId).subscribe((response: any) => {
        if(response.status == 200){
          this.snackBar.open('Uspjesno ste obrisali grupu grupu', undefined, {
            duration: 2000,
          });
          this.getGroups();
        }
      });
    }
  }

  showGroupDetails(id?: number) {
    //TODO KADA SE PRITISNE NA ODGOVARAJUCU GRUPU TREBA DA SE PRIKAZU PODACI O TOJ GRUPI
    // DAKLE VRSI SE REDIREKCIJA NA TU STRANICU
    console.log('PRIKAZUJEM PODATKE O GRUPI, CIJI JE id: ' + id);
  }

  get groups() {
    return this._groups;
  }
}
