import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ChildrenService } from 'src/app/children/services/children.service';
import { Child } from 'src/app/model/child.model';
import { FinanceServiceService } from '../services/finance-service.service';
import * as _moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
const moment = _moment;
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit{
  datum=moment();
  private _dateToShow?: string;
  private _dateToFind?: string;
   combo1:string = '';
   usluga:string = '';
   combo2:string = '';
   combo3:string = '';
   iznos:string = '';
   date:string = '';
   pom:boolean=true;
   children?: Child[] = [];
   constructor(private dialogRef: MatDialogRef<CreateDialogComponent>,
    private childrenService: FinanceServiceService,
    private snackBar: MatSnackBar)
   {
    
   }
  ngOnInit(): void {
    this.loadChildren();
  }
  options: Child[] = [];
  loadChildren()
  {
    this.childrenService.getChildren().subscribe(
      (childr) => {
      this.options = childr as Child[];
      
    });
  }
   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log("Pozvala se metoda");
      this.datum = moment(event.value);
      this._dateToShow = this.datum.format('DD') + "-" + this.datum.format('MM') + "-" + this.datum.format('YYYY');
      this._dateToFind = this.datum.format('YYYY') + "-" + this.datum.format('MM') + "-" + this.datum.format('DD');
   }
   closeDialog()
   {
    this.dialogRef.close();
   }
   createMembership()
   {
    if(this.combo3=="option1")
      this.pom=true;
    else
      this.pom=false;
    const data = {
      child: this.combo1,
      serviceType: this.usluga,
      amount: this.iznos,
      date: this._dateToFind,
      paid:this.pom,
      paymentDate:this._dateToFind
    };
    this.childrenService.createMembership(data, parseInt(this.combo1)).subscribe((response: any) => {
      if (response.status == 201) {
        this.snackBar.open('Uspjesno ste kreirali racun ', '', {
          duration: 2000,
        });
      }
    },
    () => {
      this.snackBar.open(
        'Nije moguće kreirati racun!',
        '',
        {
          duration: 2000,
        }
      );
    }
  );
   }
}
