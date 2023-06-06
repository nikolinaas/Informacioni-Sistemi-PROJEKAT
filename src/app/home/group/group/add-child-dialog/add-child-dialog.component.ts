import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeGroupNameDialogComponent } from '../change-group-name-dialog/change-group-name-dialog.component';
import { GroupService } from '../services/group.service';
import { Group } from 'src/app/model/Group';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-add-child-dialog',
  templateUrl: './add-child-dialog.component.html',
  styleUrls: ['./add-child-dialog.component.css']
})
export class AddChildDialogComponent {

  private _children?:any[];
  
 
  constructor(
    private dialogRef: MatDialogRef<ChangeGroupNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private childService:ChildService,
    private groupService:GroupService,
    private snackBar:MatSnackBar){}

    closeWindow(){
      this.dialogRef.close();
    }

ngOnInit(){
  this.getChildren();
}
    getChildren() {
      this.childService.getChildren().subscribe((children: any) => {
        
        this._children=children;
  
      });
    }

    setChildAdded(child:any){
      this.groupService.addChildInGroup(this.data.id,child).subscribe((response:any) => {

        if(response.status  == 404){
          this.snackBar.open(
            'Nije moguće dodati dijete,  jer vec pripada nekoj grupi',
            undefined,
            {
              duration: 2000,
            }
          );
        }
        }
      );
    }

    get children(){
      return this._children;
    }
}
