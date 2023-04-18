import { Component } from '@angular/core';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  groups: any;
  
  constructor(service: GroupsService){
    this.groups = service.getAll();
  }
}