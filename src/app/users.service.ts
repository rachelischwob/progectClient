import { Injectable } from '@angular/core';
import User from '../app/model/User'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }
  
  baseRouteUrl = `${environment.baseUrl}/user`
  //staticUser = new BehaviorSubject<User>(null);
  staticUser:User =new User(null,null,null,null,null,null,[]);

  getUserById(id:number) {
    return this.http.get<User>(`${this.baseRouteUrl}/GetUserById/${id}`);
  }
   
  addUser(u:User) {
    return this.http.post<User>(`${this.baseRouteUrl}/Login`,u);
  }

}

  