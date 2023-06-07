import { Component } from '@angular/core';
import { GroupService } from './services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeGroupNameDialogComponent } from './change-group-name-dialog/change-group-name-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddChildDialogComponent } from './add-child-dialog/add-child-dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  id?: string;
  group?: any;
  private groupService: GroupService;
  searchText: String = '';
  groupName: String = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.getGroup(id);
    } else {
      this.groupName = 'nije dobro';
    }
  }
  constructor(
    gs: GroupService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.groupService = gs;
  }

  getGroup(id: any) {
    this.groupService.getGroup(parseInt(id)).subscribe((gro: any) => {
      this.group = gro;
    });
  }

  removeEducator(item: any) {
    this.groupService
      .deleteEducatorFromGroup(this.group.id, item.id)
      .subscribe((response: any) => {
        this.ngOnInit();
        if (response.status == 200) {
          //ne radi nesto response status

          this.snackBar.open(
            'Uspjesno ste vaspitača dijete iz grupe',
            undefined,
            {
              duration: 2000,
            }
          );
        }
      });
  }
  removeChild(item: any) {
    this.groupService
      .deleteChildFromGroup(this.group.id, item.id)
      .subscribe((response: any) => {
        this.ngOnInit();
        if (response.status == 200) {
          //ne radi nesto response status

          this.snackBar.open(
            'Uspjesno ste obrisali dijete iz grupe',
            undefined,
            {
              duration: 2000,
            }
          );
        }
      });
  }

  addChildInGroup() {
    this.dialog
      .open(AddChildDialogComponent, {
        width: '400px',
        data: { id: this.group?.id, name: this.group?.name },
      })
      .afterClosed()
      .subscribe(() => {
        this.childrenInGroup;
        this.educatorsInGroup;
        this.ngOnInit();
      });
  }

  addEducatorInGroup() {}

  searchPerson() {
    //napraviti za trazenje
  }

  openActivityWindow() {
    this.router.navigate(['activity']); //popraviti sa id da ima
    // TODO OVO TREBA STAVITI this.router.navigate([`/groups/${this.id}/activities}`]);
    // NAKON TOGA JE POTREBNO U ROUTING DODATI DA SE VRSI REDIREKCIJA NA TU PUTANJU UMJESTO TRENUTNE
  }
  clearSearch() {}

  changName() {
    this.dialog
      .open(ChangeGroupNameDialogComponent, {
        width: '400px',
        data: { id: this.group?.id, name: this.group?.name },
      })
      .afterClosed()
      .subscribe(() => {
        this.childrenInGroup;
        this.educatorsInGroup;
        this.ngOnInit();
      });
  }

  get childrenInGroup() {
    if (this.group?.children) {
      return this.group.children;
    } else return null;
  }

  get educatorsInGroup() {
    if (this.group?.educators) {
      return this.group.educators;
    }
  }
}
