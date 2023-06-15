import { Component } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { GroupService } from '../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {

  selectedDate:string ='';
  groupName: string = '';
  group:any;
  id:any;
  activites?:any[];


  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private activityService:ActivityService,
  

  ) { }
  ngOnInit(){
   
    const id = this.route.snapshot.paramMap.get('id');
    this.id=id;
    this.getGroup(id);
    this.getActivities();
    
  }

  getGroup(id: any) {
    this.groupService.getGroup(parseInt(id)).subscribe((gro: any) => {
      this.group = gro;
      this.groupName=gro.name;
      this.group.id=gro.id;
 
    });
  }
  getActivities(){
 
  this.activityService.getActivites(this.id).subscribe((act: any) => {
    this.activites=act;

  });

  console.log("------"+this.activites?.at);
}
  onSelect(event: any) {
    this.selectedDate=event._i.date + "-" + event._i.month + "-" + event._i.year;
    console.log(event._i.date + "-" + event._i.month + "-" + event._i.year);
  }

  dateClass() {
  /*  return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDate() === 1) {
        return 'special-date';
      } else {
        return 'special-date';//popraviti
      }
    };*/
  }
}
