import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCalendarCellCssClasses, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { ArrivalAndDepartureTime } from 'src/app/model/arrivalAndDepartureTime.model';
import { ChildService } from '../services/child.service';
const moment = _moment;

@Component({
  selector: 'app-arrival-departure-time',
  templateUrl: './arrival-departure-time.component.html',
  styleUrls: ['./arrival-departure-time.component.css'],
})
export class ArrivalDepartureTimeComponent implements OnInit {
  //date = moment();
  displayedColumns: string[] = ['arrivalTime', 'departureTime'];
  currentDate = new Date();
  selectedDate: string = '';
  private _dataSource: any[] = [];
  private _datesOfArrival: any[] = [];
  private _dateToShow?: string;

  constructor(
    private dialogRef: MatDialogRef<ArrivalDepartureTimeComponent>,
    private childService: ChildService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.sendRequest();


  }


  sendRequest() {
    this.childService
      .getArrivalsAndDepartures(this.data.id)
      .subscribe((dataSource: any) => {
        this._dataSource = dataSource;

      });



  }

  convertDate(date: string) {
    const signs: string[] = date?.split("/");
    const day = signs?.[0];
    const month = signs?.[1];
    const year = signs?.[2]?.split(" ")?.[0];
    return year + "-" + month + "-" + day;
  }

  dateClass() {  //radi dobro

    return (date: any): MatCalendarCellCssClasses => {
      const highlightDate = this.dataSource
        .map(strDate => new Date(this.convertDate(strDate.recordedTime)))
        .some(d => (d.getFullYear() === date._i.year && d.getMonth() === date._i.month && d.getDate() === date._i.date))
      if (highlightDate) {
        return 'highlight-date-class'
      } else {
        return ''
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSelect(event: any) { //popraviti
 this.selectedDate = event._i.year + "-" + (event._i.month + 1) + "-" + event._i.date;
    const selDate = new Date( this.selectedDate);
    this._dateToShow = this.selectedDate;
    this._datesOfArrival=[];
    this.dataSource.forEach(d => {
     const date=new Date(this.convertDate(d.recordedTime));
      if (date.getFullYear() === event._i.year && date.getMonth()== event._i.month && date.getDate()== event._i.date) {
        this._datesOfArrival.push(d);
      }else{
       
      }
    })



  }
  checkDate(date: any): boolean {
    if (new Date(this.convertDate(date.recordedTime)).getDate === new Date(this.selectedDate).getDate && new Date(this.convertDate(date.recordedTime)).getFullYear === new Date(this.selectedDate).getFullYear && new Date(this.convertDate(date.recordedTime)).getMonth === new Date(this.selectedDate).getMonth) {
      return true;

    } else return false;
  }
  get dataSource() {
    return this._dataSource;
  }

  get dateToShow() {
    return this._dateToShow;
  }
  get datesOfArrival() {

    return this._datesOfArrival;
  }
}

