import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Child } from '../model/child.model';
import { ChildrenService } from './services/children.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateChildComponent } from './create-child-dialog/create-child/create-child.component';
import { DeleteChildComponent } from './delete-child-dialog/delete-child/delete-child.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent {
  children?: Child[];
  filteredChildren?: Child[];
  notFilteredChildren?: Child[];
  searchText: string = '';

  name = 'john';

  constructor(
    private childrenService: ChildrenService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getChildren();
  }

  getChildren() {
    this.childrenService.getChildren().subscribe((children: any) => {
      this.notFilteredChildren = children;
      this.children = this.notFilteredChildren;
      this.getChildFather(this.notFilteredChildren);
    });

  }

  getChildFather(children: any) {
    children.forEach((child: any) => {
      this.childrenService.getChild(child.id).subscribe((response: any) => {
        child.fatherName = response.body.fatherName;
      });
    });

  }

  showChildDetails(id?: number) {
    this.router.navigate([`children/${id}`]);
  }

  deleteChild(id?: number) {
    const ch = this.children?.find((c) => c.id === id);

    this.dialog
      .open(DeleteChildComponent, {
        width: '400px',
        data: { id: id, name: ch?.name, surname: ch?.surname },
      })
      .afterClosed()
      .subscribe(() => {
        this.getChildren();
      });
  }

  createChild() {
    this.dialog
      .open(CreateChildComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getChildren();
      });
  }

  searchChild() {
    if (this.searchText != '') {
      const searchTextLowerCase = this.searchText.toLowerCase();
      this.filteredChildren = this.notFilteredChildren;
      this.children = this.filteredChildren?.filter(
        (child) =>
          child.name?.toLowerCase().includes(searchTextLowerCase) ||
          child.surname?.toLowerCase().includes(searchTextLowerCase)
      );
    } else {
      this.children = this.notFilteredChildren;
    }
  }

  clearSearch() {
    this.searchText = '';
    this.children = this.notFilteredChildren;
  }


}
