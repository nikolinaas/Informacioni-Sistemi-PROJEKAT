import { Component } from '@angular/core';
import { Educator } from '../model/educator.model';
import { EducatorsService } from './service/educators.service';
import { Router } from '@angular/router';
import { CreateEducatorDialogComponent } from './create-educator-dialog/create-educator-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteEducatorDialogComponent } from './delete-educator-dialog/delete-educator-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-educators',
  templateUrl: './educators.component.html',
  styleUrls: ['./educators.component.css']
})
export class EducatorsComponent {
    _educators?: Educator[];
    filteredEducators?: Educator[];
    notFilteredEducators?: Educator[];
    searchText: string = '';

    constructor(
      private educatorService: EducatorsService,
      private router: Router,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
      this.getEducators();
    }

    getEducators(){
      this.educatorService.getEducators().subscribe((educators: any) => {
        this.notFilteredEducators = educators;
        this._educators = this.notFilteredEducators;
      });
    }

   get educators() {
      return this._educators;
    }

    showEducatorsDetails(id?:number) {
      this.router.navigate(['view', id]);
    }
    deleteEducator(id?: number): void{  
      const ch = this.educators?.find((e) => e.id === id);
     
      this.dialog
        .open(DeleteEducatorDialogComponent, {
          width: '400px',
          data: { id: id, name: ch?.name , surname: ch?.surname},
        })
        .afterClosed()
        .subscribe(() => {
          this.getEducators();
        });
    }
    createEducator(){
      this.dialog
      .open(CreateEducatorDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getEducators();
      });

    }

    searchEducator() {
      if(this.searchText != ''){
        const searchTextLowerCase = this.searchText.toLowerCase();
        this.filteredEducators = this.notFilteredEducators;
        this._educators = this.filteredEducators?.filter(educator =>
          educator.name?.toLowerCase().includes(searchTextLowerCase) ||
          educator.surname?.toLowerCase().includes(searchTextLowerCase)
        );
      }else{
        this._educators = this.notFilteredEducators;
      }
    }
    clearSearch() {
      this.searchText = '';
      this._educators = this.notFilteredEducators;
    }
  
   
}
