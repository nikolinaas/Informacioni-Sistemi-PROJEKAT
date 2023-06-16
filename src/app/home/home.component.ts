import { Component } from '@angular/core';
import { GroupService } from './services/group.service';
import { Group } from '../model/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { DeleteGroupDialogComponent } from './delete-group-dialog/delete-group-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private _groups?: Group[];

  constructor(
    private router: Router ,
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
      this.dialog
        .open(DeleteGroupDialogComponent, {
          width: '400px',
          data: { id: groupId, name: group.name },
        })
        .afterClosed()
        .subscribe(() => {
          this.getGroups();
        });
    }
  }

  showGroupDetails(id?:number) {
    this.router.navigate(['groups',id]);
  }

  get groups() {
    return this._groups;
  }
}
