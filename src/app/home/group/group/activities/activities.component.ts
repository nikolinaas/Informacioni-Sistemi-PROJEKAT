import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCell, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { GroupService } from '../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivityService } from '../services/activity.service';
import { Moment } from 'moment';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { DeleteActivityDialogComponent } from './delete-activity-dialog/delete-activity-dialog.component';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  activityId: any;
  activityDescription: string = '';
  activityName: string = '';
  activityDuration: any;
  selectedDate: any;
  groupName: string = '';
  group: any;
  id: any;
  activites?: any[];
  private dates: any[] = [];
  highlitedDays: Date[] = [];
  isButtonEnabled = false;
  @ViewChild('myCalendar') calendar: MatCalendar<Date> | undefined;


  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }



  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl('')
  });

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }
  ngOnInit() {

    this.dateClass();
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getGroup(id);
    this.getActivities();



  }

  getGroup(id: any) {
    this.groupService.getGroup(parseInt(id)).subscribe((gro: any) => {
      this.group = gro;
      this.groupName = gro.name;
      this.group.id = gro.id;


    });
  }
  getActivities() {

    this.activityService.getActivites(this.id).subscribe((act: any) => {
      this.activites = act;
      this.fillDates();
    });


  }
  fillDates() {
    if (this.activites)
      for (var act of this?.activites) {
        this.dates.push(this.convertDate(act.date));
        this.highlitedDays.push(new Date(this.convertDate(act.date)));

      }
  }
  resetFields() {
    this.activityDescription = '';
    this.activityName = '';
    this.activityDuration = 0;

  }
  dateExistsInActivites(selectedDate: string): boolean {
    if (this.activites)
      for (var act of this.activites) {
        if ((new Date(this.convertDate(act.date))).getDate() === new Date(this.convertDate(selectedDate)).getDate() && (new Date(this.convertDate(act.date))).getMonth() === new Date(this.convertDate(selectedDate)).getMonth() && (new Date(this.convertDate(act.date))).getFullYear() === new Date(this.convertDate(selectedDate)).getFullYear()) {
          this.activityName = act.name;
          this.activityDescription = act.description;
          this.activityDuration = act.duration;
          this.activityId = act.id;
          this.enableButton();
          return true;
        }
      }
    return false;
  }

  onSelect(event: any) {
    this.selectedDate = event._i.date + "/" + (Number(event._i.month) + 1) + "/" + event._i.year;
    if (this.dateExistsInActivites(this.selectedDate)) {

    } else {
      this.isButtonEnabled = false;
      this.dialog.open(WarningDialogComponent, {
        width: '400px',
      });
      this.resetFields();
    }
  }

  convertDate(date: string) {
    const signs: any[] = date.split("/");
    const day = signs[0];
    const month = signs[1];
    const year = signs[2];
    return year + "-" + month + "-" + day;
  }


  dateClass() {
    return (date: any): MatCalendarCellCssClasses => {
      const highlightDate = this.dates
        .map(strDate => new Date(this.convertDate(strDate)))
        .some(d => (d.getFullYear() === date._i.year && d.getMonth() === date._i.month && d.getDate() === date._i.date))
      if (highlightDate) {
        return 'highlight-date-class'
      } else {
        return ''
      }
    }
  }

  addActivity() {
    this.dialog
      .open(AddActivityComponent, {
        width: '400px', data: { id: this.id }

      }).afterClosed().subscribe(() => {
        this.ngOnInit();
      });

  }

  enableButton() {
    this.isButtonEnabled = true;
  }

  deleteActivity(idA: any) {
    this.dialog
      .open(DeleteActivityDialogComponent, {
        width: '400px',
        data: { idAct: idA, idG: this.group.id },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });

  }
}