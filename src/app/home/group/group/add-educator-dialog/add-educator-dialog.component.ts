import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChildService } from '../services/child.service';
import { GroupService } from '../services/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeGroupNameDialogComponent } from '../change-group-name-dialog/change-group-name-dialog.component';
import { EducatorService } from '../services/educator.service';

@Component({
  selector: 'app-add-educator-dialog',
  templateUrl: './add-educator-dialog.component.html',
  styleUrls: ['./add-educator-dialog.component.css']
})
export class AddEducatorDialogComponent {

  private _educators?: any[];
  private _filteredEducators?: any[];
  private _noFilteredEducators?: any[];

  searchText: string = '';

  constructor(
    private dialogRef: MatDialogRef<ChangeGroupNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educatorService: EducatorService,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) { }

  closeWindow() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getEducators();

  }

  getEducators() {
    this.educatorService.getEducators().subscribe((educators: any) => {
      this._educators = educators;
      this._noFilteredEducators = educators;
    });

  }

  clearSearch() {
    this.searchText = '';
    this._educators = this._noFilteredEducators;
  }

  educatorExistsInGroup(educator: any): boolean {
    let pom = false;
    for (var ed of this.data.educators) {
      if(ed.id==educator.id)
        pom=true;
    }
    return pom;
  }
  searchEducator() {
    if (this.searchText != '') {
      const searchTextLowerCase = this.searchText.toLowerCase();
      this._filteredEducators = this._noFilteredEducators;
      this._educators = this._filteredEducators?.filter(educator =>
        educator.name?.toLowerCase().includes(searchTextLowerCase) ||
        educator.surname?.toLowerCase().includes(searchTextLowerCase)
      );
    } else {
      this._educators = this._noFilteredEducators;
    }
  }
  addEducatorInGroup(educator: any) {

    this.groupService
      .addEducatorInGroup(this.data.id, educator)
      .subscribe((response: any) => {
        if (response.status == 200) {
          this.snackBar.open(
            'Uspješno ste dodali vaspitača u grupu.',
            undefined,
            {
              duration: 2000,
            }
          );
        } else if (response.status == 404) {
          this.snackBar.open('Nije moguće dodati vaspitača, jer već pripada nekoj grupi', undefined, {
            duration: 2000,
          });
          // TODO OVDE JE POTREBNO POSTAVITI VRIJEDNOST ZA CHECKBOX NA 'false' JER NIJE MOGUCE DODATI DIJET
          // I NEMA POTREBE DA BUDE SELEKTOVAN CHECKBOX TOG DJETETA
        }
      });


  }

  get educators() {
    return this._educators;
  }

  get nofilteredEducators() {
    return this._noFilteredEducators;
  }
}
