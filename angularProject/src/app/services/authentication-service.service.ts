import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base_url = "http://localhost:52295"

    constructor(private http: Http, private httpClient: HttpClient) { }

    register(user): Observable<any> {
        console.log(user);
        return this.httpClient.post(this.base_url+"/api/Account/Register",user);
    }

  // Todo implementation 
}