import { Component, OnInit } from '@angular/core';
import { Child } from '../model/child.model';
import { ChildService } from './services/child.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ArrivalDepartureTimeComponent } from './arrival-departure-time/arrival-departure-time.component';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css'],
})
export class EvidenceComponent implements OnInit {
  private _children?: Child[];
  private _filteredChildren?: Child[];
  private _noFilteredChildren?: Child[];
  
  searchText: string = '';
  currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

  constructor(
    private childService: ChildService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getChildren();
  }

  getChildren() {
    this.childService.getChildren().subscribe((children: any) => {
      this._noFilteredChildren = children;
      this._children = this._noFilteredChildren;
    });
  }

  showChildEvidence(id?: number) {
    this.dialog.open(ArrivalDepartureTimeComponent, {
      width: '500px',
      height: '600px',
      data: { id: id },
    });
  }

  setChildIsHere(id?: number) {
    const c = this._children?.find((c) => c.id === id);
    const child = {
      isHere: c?.isHere,
    };
    this.childService.evidenceChild(id, child).subscribe(() => {});
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

  clearSearch() {
    this.searchText = '';
    this._children = this._noFilteredChildren;
  }

  get children() {
    return this._children;
  }
}
