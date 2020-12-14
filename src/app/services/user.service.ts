import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Populate the user fields:


  constructor( private http: HttpClient ) { }

  getUser() {
    return this.http.get('https://randomuser.me/api');
  }

}
