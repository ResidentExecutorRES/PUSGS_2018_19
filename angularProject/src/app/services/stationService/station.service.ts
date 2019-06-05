import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  baseUrl = "http://localhost:52295";

  constructor(private http:Http, private httpClient:HttpClient) { }

  addStation(station): Observable<any>{
    return this.httpClient.post(this.baseUrl + "/api/Stations/Add", station);
  }
}
