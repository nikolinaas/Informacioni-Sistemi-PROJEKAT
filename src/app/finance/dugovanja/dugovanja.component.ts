import { Component, OnInit } from '@angular/core';
import { FinanceServiceService } from '../services/finance-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { Membership } from 'src/app/model/Membership';

@Component({
  selector: 'app-dugovanja',
  templateUrl: './dugovanja.component.html',
  styleUrls: ['./dugovanja.component.css'],
})
export class DugovanjaComponent implements OnInit {
  memberships: Membership[] = [];
  filteredMembership: Membership[] = [];
  searchText: string = '';

  columns = ['Ime', 'Prezime', 'Paket', 'Datum1', 'Placeno', 'Iznos', 'Datum2'];
  index = [
    'child.name',
    'child.surname',
    'serviceType',
    'date',
    'paid',
    'amount',
    'paymentDate',
  ];

  constructor(
    private financeService: FinanceServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.financeService.getMembership().subscribe((responese) => {
      this.memberships = responese as Membership[];
    });
  }

  createDebt() {
    this.dialog.open(CreateDialogComponent, {
      width: '400px',
    });
  }

  searchChild() {

  }

  clearSearch() {
    this.searchText = '';
    //this.children = this.notFilteredChildren;
  }

  // constructor(private router:Router,private dialog: MatDialog,
  //    private financeService: FinanceServiceService)
  // {
  //   this.filteredMembership=[...this.membership];
  // }

  // filterMembership(){
  //   const searchText = this.pretraziDjecu.toLowerCase().trim();

  //   // Filter membership array based on search criteria
  //   this.filteredMembership = this.membership.filter((mem) => {
  //     const name = mem.child?.name?.toLowerCase();
  //     const surname = mem.child?.surname?.toLowerCase();

  //     return (name && name.includes(searchText)) || (surname && surname.includes(searchText));
  //   });
  // }

}
