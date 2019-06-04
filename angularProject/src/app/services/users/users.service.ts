import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable({
    providedIn: 'root'
  })

export class UsersService{
    constructor(private http: Http, private httpClient: HttpClient) { }
    
    getUserClaims() {
         return this.httpClient.get('http://localhost:52295/api/Account/UserInfo')
    }

    getUserData(email:string) {
    return this.httpClient.get('http://localhost:52295/api/AppUser/GetUser?email='+email)
    }

}