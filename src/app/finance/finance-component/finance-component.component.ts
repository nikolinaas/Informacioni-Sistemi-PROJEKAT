import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-component',
  templateUrl: './finance-component.component.html',
  styleUrls: ['./finance-component.component.css']
})
export class FinanceComponentComponent {

  constructor(private router:Router){

  }
  handleLabelClick1()
  {
    this.router.navigate(['costs']);
  }
  handleLabelClick2()
  {
    this.router.navigate(['debts']);
  }

}
