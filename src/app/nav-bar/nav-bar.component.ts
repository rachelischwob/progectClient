import { Component, Input, OnInit } from '@angular/core';
import User from '../model/Child'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'lesson11';

}
