import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-component',
  templateUrl: './finance-component.component.html',
  styleUrls: ['./finance-component.component.css'],
})
export class FinanceComponentComponent {
  constructor(private router: Router) {}

  showCosts() {
    this.router.navigate(['costs']);
  }
  
  showMemberships() {
    this.router.navigate(['memberships']);
  }
}
