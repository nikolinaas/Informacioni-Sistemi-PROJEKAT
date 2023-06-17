import { Component } from '@angular/core';
import { Membership } from 'src/app/model/membership.model';
import { FinanceServiceService } from '../services/finance-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateMembershipDialogComponent } from '../create-membership-dialog/create-membership-dialog.component';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent {

  private _memberships: Membership[] = [];
  private _filteredMemberships: Membership[] = [];
  private _noFilteredMemberships: Membership[] = [];

  searchText: string = '';

  columns = ['Ime', 'Prezime', 'Tip usluge', 'Članarina za mjesec', 'Plaćeno', 'Iznos', 'Datum plaćanja'];

  constructor(
    private financeService: FinanceServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.financeService.getMemberships().subscribe((responese) => {
      this._noFilteredMemberships = responese as Membership[];
      this._memberships = responese as Membership[];
    });
  }

  createMembership() {
    const dialogRef: MatDialogRef<CreateMembershipDialogComponent> = this.dialog.open(CreateMembershipDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.ngOnInit();
      }
    });
  }

  searchChild() {
    if(this.searchText != ''){
      const searchTextLowerCase = this.searchText.toLowerCase();
      this._filteredMemberships = this._noFilteredMemberships;
      this._memberships = this._filteredMemberships.filter(membership =>
        (membership.child && membership.child.name && membership.child.name.toLowerCase().includes(searchTextLowerCase)) ||
        (membership.child && membership.child.surname && membership.child.surname.toLowerCase().includes(searchTextLowerCase))
      );      
    }else{
      this._memberships = this._noFilteredMemberships;
    }
  }

  clearSearch() {
    this.searchText = '';
    this._memberships = this._noFilteredMemberships;
  }

  changeStatus(membership: any) {
    this.financeService.updateMembersip(membership.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  get memberships() {
    return this._memberships;
  }
}
