import { Component } from '@angular/core';
import { Child } from 'src/app/model/child.model';
import { GroupService } from './services/group.service';
import { Group } from 'src/app/model/group.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeGroupNameDialogComponent } from './change-group-name-dialog/change-group-name-dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  id?: string;
  group?: any;
  private _educatorsInGroup?: any[];
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
    private router: Router
  ) {
    this.groupService = gs;
  }

  getGroup(id: any) {
    this.groupService.getGroup(parseInt(id)).subscribe((gro: any) => {
      this.group = gro;
    });
  }

  searchPerson() {
    //napraviti za trazenje
  }

  openActivityWindow() {
    this.router.navigate(['activity']); //popraviti sa id da ima
    // TODO OVO TREBA STAVITI this.router.navigate([`/groups/${this.id}/activities}`]);
    // NAKON TOGA JE POTREBNO U ROUTING DODATI DA SE VRSI REDIREKCIJA NA TU PUTANJU UMJESTO TRENUTNE
  }
  clearSearch() {}

  addChildClick() {
    this.dialog
      .open(ChangeGroupNameDialogComponent, {
        width: '400px',
        data: { id: this.group?.id, name: this.group?.name },
      })
      .afterClosed()
      .subscribe(() => {
        this.childrenInGroup;
        this.ngOnInit();
      });
  }

  get childrenInGroup() {
    if (this.group?.children) {
      return this.group.children;
    } else return null;
  }

  get educatorsInGroup() {
    return this._educatorsInGroup;
  }
}
