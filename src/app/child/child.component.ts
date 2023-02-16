import { Component, Input, OnInit } from '@angular/core';
import Child from '../model/Child'

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input()
  myChild:Child;
  
  // @Input()
  // myChildNumber:Child;
  constructor() { }

  ngOnInit(): void {
  }

}
