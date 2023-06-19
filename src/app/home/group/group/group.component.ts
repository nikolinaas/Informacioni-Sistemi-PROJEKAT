import { Component } from '@angular/core';
import { GroupService } from './services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeGroupNameDialogComponent } from './change-group-name-dialog/change-group-name-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddChildDialogComponent } from './add-child-dialog/add-child-dialog.component';
import { AddEducatorDialogComponent } from './add-educator-dialog/add-educator-dialog.component';
import { ChildService } from './services/child.service';
import { ReturnStatement } from '@angular/compiler';

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
  child:any;
  private _filteredChildren?: any[];
  private _noFilteredChildren?: any[];
  private _filteredEducators?: any[];
  private _noFilteredEducators?: any[];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = id;
      this.getGroup(this.id);
    }
  }

  constructor(
    private groupService: GroupService,
    private childService:ChildService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getGroup(id: any) {
    this.groupService.getGroup(parseInt(id)).subscribe((gro: any) => {
      this.group = gro;
      this._noFilteredChildren = this.group.children;
      this._noFilteredEducators = this.group.educators;
    });
  }


  removeEducator(item: any) {
    this.groupService
      .deleteEducatorFromGroup(this.group.id, item.id)
      .subscribe((response: any) => {
        this.ngOnInit();
        if (response.status == 200) {
          this.snackBar.open(
            'Uspješno ste obrisali vaspitača iz grupe.',
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
            'Uspješno ste obrisali dijete iz grupe.',
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
    this.dialog
      .open(AddEducatorDialogComponent, {
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

  searchPerson() {
    if (this.searchText != '') {
      const searchTextLowerCase = this.searchText.toLowerCase();
      this._filteredChildren = this._noFilteredChildren;
      this.group.children = this._filteredChildren?.filter(
        (child) =>
          child.name?.toLowerCase().includes(searchTextLowerCase) ||
          child.surname?.toLowerCase().includes(searchTextLowerCase)
      );
      this._filteredEducators = this._noFilteredEducators;
      this.group.educators = this._filteredEducators?.filter(
        (educator) =>
          educator.name?.toLowerCase().includes(searchTextLowerCase) ||
          educator.surname?.toLowerCase().includes(searchTextLowerCase)
      );
    } else {
      this.group.children = this._noFilteredChildren;
      this.group.educators = this._noFilteredEducators;
    }
  }

  openActivityWindow() {
    this.router.navigate([`groups/${this.group?.id}/activities`]);
  }

  clearSearch() {
    this.searchText = '';
    this.group.children = this._noFilteredChildren;
    this.group.educators = this._noFilteredEducators;
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
