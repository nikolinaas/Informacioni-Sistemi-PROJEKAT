import { Component } from '@angular/core';
import { ChildrenService } from './children.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent {
  children: any;
  
  constructor(service: ChildrenService){
    this.children = service.getAll();
  }
}
