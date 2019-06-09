import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimetableModel2 } from 'src/app/models/timetable.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  baseUrl = "http://localhost:52295";

  constructor(private http:Http, private httpClient:HttpClient) { }

  addTimeTable(timeTable : TimetableModel2): Observable<any>{
    return this.httpClient.post(this.baseUrl + "/api/Timetable/Add", timeTable);
  }
}
