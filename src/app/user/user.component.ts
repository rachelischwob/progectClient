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
 myEgender:string;
 countChild:number=0;
 countSaveChild:number=0;
  validFName = new FormControl('', [Validators.required]);
  validLName = new FormControl('', [Validators.required]);
  validID = new FormControl('', [Validators.required],);
  constructor(private userService: UsersService) {
   }
  ngOnInit(): void {
    this.myUser=this.userService.staticUser;
 if(this.myUser.EGender==0)
 this.myEgender="femail";
 if(this.myUser.EGender==1)
 this.myEgender="mail"
  }
  getErrorMessage() {
    if (this.validID.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.validID.hasError('pattern'))
    return 'there is not letter in ID'
    return 'an ID has 9 digits ';
  }
  addChild(){
    this.countChild++;
    console.log(this.myUser);
    this.newChild= new Child(null,null,null);
    this.myUser.arrChild.push(this.newChild);
    console.log("addchild");
  }
  countSave(e)
  {
    if(e==true)
     this.countSaveChild++;
  }
  save(){
    console.log(this.countSaveChild);
    console.log(this.countChild);
    if(this.countSaveChild==this.countChild)
   { if(this.myEgender=="one")
    this.myUser.EGender=0;
    else
    this.myUser.EGender=1;
    console.log("save");
    this.userService.addUser(this.myUser);
    console.log("down");
    this.downloadExcel();
  }
 else 
 alert("you need to fill details about alll your children");
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
   if(this.myEgender=="femail")
   this.myUser.EGender=0;
   if(this.myEgender=="mail")
   this.myUser.EGender=1;
   this.userService.staticUser=this.myUser;
 }
}
