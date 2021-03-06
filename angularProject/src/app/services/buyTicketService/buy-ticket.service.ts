import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PomModelForBuyTicket } from 'src/app/models/pomModelForBuyTicket.model';

@Injectable({
  providedIn: 'root'
})
export class BuyTicketService {

  baseUrl = "http://localhost:52295"

    constructor(private http: Http, private httpClient: HttpClient) { }
    
    buyTicket(buyTicketForm: PomModelForBuyTicket) {
     return this.httpClient.post(this.baseUrl + "/api/Tickets/Add", buyTicketForm);
     
    //return this.httpClient.put(this.baseUrl + "/Tickets/Add", {email, typeOfTicket})
    }

    buyTicketViaEmail(ticket): Observable<any>{

      return this.httpClient.post(this.baseUrl + "/api/Tickets/SendMail",ticket);
   }

}
