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
    // const dateToFind = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
    //this._dateToShow = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
    this.sendRequest();


  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      /*    this.date = moment(event.value);
          this._dateToShow = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
          const dateToFind = this.date.format('MM') + "-" + this.date.format('DD') + "-" + this.date.format('YYYY');
          this.sendRequest(dateToFind);*/
    }
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

  dateExistsInDB(date: any): boolean {
    for (let i = 0; i <= this._dataSource.length; i++) {
      if (((new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getDate) === (new Date(date).getDate)) && ((new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getFullYear) === (new Date(date).getFullYear)) && ((new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getMonth) === (new Date(date).getMonth))) {
        console.log(new Date(this.convertDate(this.dataSource[i]?.recordedTime)));
        console.log("------" + new Date(date))
        console.log('postoji');
        return true;
      } else {
        console.log('ne postoji')
        return false;
      }
    }
    return false;
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
    console.log(this.selectedDate);
    this._dateToShow = this.selectedDate;
    this.dataSource.forEach(d => {
     const date=new Date(this.convertDate(d.recordedTime));
     console.log(date.getFullYear() + "////" + event._i.getFullYear)
      if (date.getFullYear() === event._i.year && date.getMonth()== event._i.month && date.getDate()== event._i.date) {
        this._datesOfArrival.push(d);
      } else {
        this._datesOfArrival = [];
        console.log("else")
      }
    })

    /*  console.log(this.selectedDate);
      if (this.dataSource){
        console.log("uslo u if");
        for (let i = 0; i <= this.dataSource?.length; i++) {
          console.log(new Date(this.convertDate(this.dataSource[i]?.recordedTime)));
          console.log("---" +new Date(this.selectedDate))
          if(new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getDate===new Date(this.selectedDate).getDate && new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getMonth===new Date(this.selectedDate).getMonth && new Date(this.convertDate(this.dataSource[i]?.recordedTime)).getFullYear===new Date(this.selectedDate).getFullYear){
            console.log("uslo");
           this._datesOfArrival.push(this.dataSource[i]);
            
          }
         
          // console.log(this.convertDate(this.dataSource[i].recordedTime));
        }
      }*/

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
