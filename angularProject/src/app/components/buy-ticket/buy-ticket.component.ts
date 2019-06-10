import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BuyTicketService } from 'src/app/services/buyTicketService/buy-ticket.service';
import { PomModelForBuyTicket } from 'src/app/models/pomModelForBuyTicket.model';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  loggedUser: any = []

  emailLoggedUser: string = ""



  constructor(private authService: AuthenticationService, private usersService: UsersService,
    private buyTicketService: BuyTicketService) { 
    
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(d=>{
      this.loggedUser = d;
      this.emailLoggedUser = this.loggedUser.Email
      console.log("Ulogovani korisnik: ", this.loggedUser)
    })
  }

  ngOnInit() {
  }


  onSubmit(buyTicketForm: PomModelForBuyTicket, form: NgForm){
    console.log("Karta: ", buyTicketForm);
    
    console.log("Email from Local storage: ", this.emailLoggedUser);
    if(this.loggedUser.UserTypeId == 3){
      buyTicketForm.Email = this.emailLoggedUser;
      
      this.buyTicketService.buyTicket(buyTicketForm).subscribe(d=>{
        alert("Succesfull buy ticket");
      });
    }

   
  }

}
