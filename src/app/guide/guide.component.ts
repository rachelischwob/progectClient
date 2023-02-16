import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  userLastName:string;
  userFirstName:string;
  constructor(private userService: UsersService) {
   }

  ngOnInit(): void {
     this.userLastName=this.userService.staticUser.LastName;
    this.userFirstName=this.userService.staticUser.FirstName;
    //this.userLastName=this.userService.staticUser.value?.LastName;
   // this.userFirstName=this.userService.staticUser.value?.FirstName;
  }

}
