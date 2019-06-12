import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateTicketService {
  baseUrl = "http://localhost:52295"

  constructor(private http: Http, private httpClient:HttpClient) { }

  getAllTypeOfTicket(){
    return this.httpClient.get(this.baseUrl + "/api/Tickets/GetAllTypeOfTicket");
  }

  getTicket(id) {
    return this.httpClient.get(this.baseUrl+"/api/Tickets/GetTicket?id="+id);
  }
}
