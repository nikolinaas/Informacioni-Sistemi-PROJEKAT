import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeGroupNameDialogComponent } from '../change-group-name-dialog/change-group-name-dialog.component';
import { GroupService } from '../services/group.service';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-add-child-dialog',
  templateUrl: './add-child-dialog.component.html',
  styleUrls: ['./add-child-dialog.component.css'],
})
export class AddChildDialogComponent {
  private _children?: any[];
  private _filteredChildren?: any[];
  private _noFilteredChildren?:any[];

  searchText: string = '';
  constructor(
    private dialogRef: MatDialogRef<ChangeGroupNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private childService: ChildService,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) { }

  closeWindow() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.childService.getChildren().subscribe((children: any) => {
      this._children = children;
      this._noFilteredChildren=children;
    });
  }

  clearSearch() {
    this.searchText = '';
    this._children = this._noFilteredChildren;
  }

  searchChild() {
    if(this.searchText != ''){
      const searchTextLowerCase = this.searchText.toLowerCase();
      this._filteredChildren = this._noFilteredChildren;
      this._children = this._filteredChildren?.filter(child =>
        child.name?.toLowerCase().includes(searchTextLowerCase) ||
        child.surname?.toLowerCase().includes(searchTextLowerCase)
      );
    }else{
      this._children = this._noFilteredChildren;
    }
  }

  addChildInGroup(child: any) {
    this.groupService
      .addChildInGroup(this.data.id, child)
      .subscribe((response: any) => {
        if (response.status == 200) {
          this.snackBar.open(
            'Uspješno ste dodali dijete u grupu.',
            undefined,
            {
              duration: 2000,
            }
          );
        } else if (response.body.statusCode == 404) {
          this.snackBar.open('Nije moguće dodati dijete, jer vec pripada nekoj grupi', undefined, {
            duration: 2000,
          });
          // TODO OVDE JE POTREBNO POSTAVITI VRIJEDNOST ZA CHECKBOX NA 'false' JER NIJE MOGUCE DODATI DIJET
          // I NEMA POTREBE DA BUDE SELEKTOVAN CHECKBOX TOG DJETETA
        }
      });
  }

  get children() {
    return this._children;
  }
}
