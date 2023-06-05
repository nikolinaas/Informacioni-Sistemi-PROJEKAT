import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
@Component({
  selector: 'app-dugovanja',
  templateUrl: './dugovanja.component.html',
  styleUrls: ['./dugovanja.component.css']
})
export class DugovanjaComponent {
  isChecked:boolean=false;
  pretraziDjecu:string='';

  constructor(private router:Router,private dialog: MatDialog)
  {
    
  }
  addClick()
  {
    //this.router.navigate(['dialog']);
    this.dialog.open(CreateDialogComponent,{
      width: '400px'})
  }
}
