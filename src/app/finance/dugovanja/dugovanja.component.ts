import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { Membership } from 'src/app/model/Membership';
import { FinanceServiceService } from '../services/finance-service.service';
@Component({
  selector: 'app-dugovanja',
  templateUrl: './dugovanja.component.html',
  styleUrls: ['./dugovanja.component.css']
})
export class DugovanjaComponent implements OnInit{
  isChecked:boolean=false;
  pretraziDjecu:string='';

  constructor(private router:Router,private dialog: MatDialog,
     private financeService: FinanceServiceService)
  {
    this.filteredMembership=[...this.membership];
  }
  ngOnInit(): void {
    this.financeService.getMembership().subscribe
      (
        (responese)=>
        {
          this.membership=responese as Membership[];
        }
        
      )
      console.log(this.membership[0].serviceType);
  }
  columns = ["Ime","Prezime","Paket","Datum1","Placeno", "Iznos", "Datum2"];
  index = ["child.name", "child.surname", "serviceType", "date", "paid", "amount", "paymentDate"];


  membership : Membership[] = [];
  filteredMembership: Membership[] = [];

  filterMembership(){
    const searchText = this.pretraziDjecu.toLowerCase().trim();

    // Filter membership array based on search criteria
    this.filteredMembership = this.membership.filter((mem) => {
      const name = mem.child?.name?.toLowerCase();
      const surname = mem.child?.surname?.toLowerCase();

      return (name && name.includes(searchText)) || (surname && surname.includes(searchText));
    });
  }
  addClick()
  {
    //this.router.navigate(['dialog']);
    this.dialog.open(CreateDialogComponent,{
      width: '400px'})
  }
}
