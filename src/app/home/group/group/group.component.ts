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
  searchText: String = '';
  groupName: String = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = id;
      this.getGroup(this.id);
    }
  }

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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

  removeChild(child: any) {
    this.groupService
      .deleteChildFromGroup(this.group.id, child.id)
      .subscribe((response: any) => {
        this.ngOnInit();
        if (response.status == 200) {
          this.snackBar.open(
            'Uspješno ste obrisali dijete iz grupe',
            undefined,
            {
              duration: 2000,
            }
          );
          this.getGroup(this.id);
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

  addEducatorInGroup() {
    // TODO OVO IMPLEMENTIRATI
  }

  searchPerson() {
    // TODO OVO IMPLEMENTIRATI
  }

  openActivityWindow() {
    this.router.navigate([`groups/${this.id}/activities`]);
  }

  clearSearch() {
    // TODO OVO IMPLEMENTIRATI
  }

  changeName() {
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
