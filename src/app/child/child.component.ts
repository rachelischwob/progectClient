import { Component,EventEmitter, Input,Output, OnInit } from '@angular/core';
import Child from '../model/Child'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input()
  myChild:Child;
  @Output()
  mySaveEvent=new EventEmitter<boolean>();
 isOk:boolean=true;
  validName = new FormControl('', [Validators.required]);
  validID = new FormControl('', [Validators.required],);
  // @Input()
  // myChildNumber:Child;
  constructor() { }

  ngOnInit(): void {
  }
  getErrorMessage() {
    if (this.validID.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.validID.hasError('pattern'))
    return 'there is not letter in ID'
    return 'an ID has 9 digits ';
  }
  saveMe(){
    console.log("saveme")
    this.mySaveEvent.emit(this.isOk);
    this.isOk=false;
  }
}
