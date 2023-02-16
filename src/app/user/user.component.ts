import { Component, OnInit,OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import User from '../model/User';
import Child from '../model/Child';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit,OnDestroy {
 myUser:User;
 newChild:Child;
  validFName = new FormControl('', [Validators.required]);
  validLName = new FormControl('', [Validators.required]);
  validID = new FormControl('', [Validators.required],);
  constructor(private userService: UsersService) {
   }
  ngOnInit(): void {
    this.myUser=this.userService.staticUser;
 
  }
  getErrorMessage() {
    if (this.validID.hasError('required')) {
      return 'You must enter a value';
    }

    return 'an ID has 9 digits ';
  }
  addChild(){
    console.log(this.myUser)
    this.newChild= new Child(null,null,null);
    this.myUser.arrChild.push(this.newChild);
  }
  save(){
    console.log("save");
    this.userService.addUser(this.myUser);
    this.downloadExcel();
  }
   workbook = new Workbook();
   worksheet = this.workbook.addWorksheet("User Data");
  header=["key","value"]
  headerRow = this.worksheet.addRow(this.header); 
   downloadExcel(){
    let x3=Object.keys( this.myUser);
    let temp=[];
    for(let y of x3)
    {
      if(y!="arrChild")
      {temp.push(y)
      temp.push(this.myUser[y])
      this.worksheet.addRow(temp)
      temp=[];
      }
    }

if( this.myUser["arrChild"]!=[])
{
 this.worksheet.addRow(["arr children"]);
 let childKeies=Object.keys( this.myUser.arrChild[0]);
for(let y1 of childKeies)
{
  temp.push(y1);
}
this.worksheet.addRow(temp)
temp=[];
 for(let x of this.myUser.arrChild)
    {
      for(let y2 of childKeies)
      {
        temp.push(x[y2]);
      }
      this.worksheet.addRow(temp)
      temp=[];
    }
}

   
   
    let fname="Emp Data Sep 2020"

//add data and file name and download
 this.workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
});


   }
 ngOnDestroy():void{
   //this.userService.staticUser.next(this.myUser);
   this.userService.staticUser=this.myUser;
 }
}
