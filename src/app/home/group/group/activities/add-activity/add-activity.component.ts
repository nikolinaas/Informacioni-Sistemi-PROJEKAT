import { Component,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CreateChildComponent } from 'src/app/children/create-child-dialog/create-child/create-child.component';
import { ChildrenService } from 'src/app/children/services/children.service';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {

id:any;

  date :any;
  private _dateToFind?: string;
  today: Date = new Date();

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required)
  });


  constructor(
    private dialogRef: MatDialogRef<CreateChildComponent>,
    private activityService: ActivityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(){
    
  }
  closeDialog() {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Obavezno polje';
    }
    return '';
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'change') {
      this.date = moment(event.value);
      this._dateToFind =
        this.date._i.year+
        '-' +
        (this.date._i.month+1) +
        '-' +
        (this.date._i.date+1);
    }
  }

  createActivity() {

    const data = {
      name: this.form.value.name,
      description: this.form.value.description,
      duration: this.form.value.number,
      date: this._dateToFind
    };
    this.activityService.addActivity(this.data.id,data).subscribe(
      (response: any) => {
        if (response.status == 201) {
          this.snackBar.open('Uspješno ste kreirali novu aktivnost ', '', {
            duration: 2000,
          });
          this.dialogRef.close(true);
        }else{
          this.snackBar.open('Kreiranje aktivnosti nije uspješno ', '', {
            duration: 2000,
          });
        }
      })
      
    }
}
