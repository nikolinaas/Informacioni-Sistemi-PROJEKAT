import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  isLog: boolean= false;
  email: string | undefined;
  password: string | undefined;

  constructor(private router:Router){}

  login() {
    
    //TODO Ako je logovanje uspjesno poziva se sledece
    this.isLog=true;

  }
}
