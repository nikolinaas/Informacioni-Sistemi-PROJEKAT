import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { ArrivalAndDepartureTime } from 'src/app/model/arrivalAndDepartureTime.model';
import { ChildService } from '../services/child.service';
const moment = _moment;

@Component({
  selector: 'app-arrival-departure-time',
  templateUrl: './arrival-departure-time.component.html',
  styleUrls: ['./arrival-departure-time.component.css'],
})
export class ArrivalDepartureTimeComponent implements OnInit{
  date = moment();
  displayedColumns: string[] = ['arrivalTime', 'departureTime'];
  currentDate = new Date();
  
  private _dataSource?: ArrivalAndDepartureTime[];
  private _dateToShow?: string;

  constructor(
    private dialogRef: MatDialogRef<ArrivalDepartureTimeComponent>,
    private childService: ChildService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  ngOnInit(): void {
    const dateToFind = this.date.format('MM') + "-" + this.date.format('DD') + "-" + this.date.format('YYYY');
    this._dateToShow = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
    this.sendRequest(dateToFind);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      this.date = moment(event.value);
      this._dateToShow = this.date.format('DD') + "-" + this.date.format('MM') + "-" + this.date.format('YYYY');
      const dateToFind = this.date.format('MM') + "-" + this.date.format('DD') + "-" + this.date.format('YYYY');
      this.sendRequest(dateToFind);
    }
  }

  sendRequest(dateToFind: string) {
    this.childService
    .getArrivalsAndDepartures(this.data.id, dateToFind)
    .subscribe((dataSource: any) => {
      this._dataSource = dataSource;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get dataSource() {
    return this._dataSource;
  }

  get dateToShow() {
    return this._dateToShow;
  }
}
