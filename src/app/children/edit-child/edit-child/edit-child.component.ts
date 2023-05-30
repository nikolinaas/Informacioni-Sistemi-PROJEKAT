import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent {
  
  @Input() name: any;
  
}
