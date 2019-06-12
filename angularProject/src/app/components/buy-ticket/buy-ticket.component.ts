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
      console.log("cc", localStorage.getItem('name'));
    if(localStorage.getItem('name') != null){
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(d=>{
      this.loggedUser = d;
      this.emailLoggedUser = this.loggedUser.Email
      console.log("Ulogovani korisnik: ", this.loggedUser)
    })
  }
  }

  ngOnInit() {
  }


  onSubmit(buyTicketForm: PomModelForBuyTicket, form: NgForm){
    console.log("Karta: ", buyTicketForm);
    

    console.log("Email from Local storage: ", this.emailLoggedUser);
    let rola =  localStorage.getItem('role');
    let mail = localStorage.getItem('name');
    if(rola == "AppUser"){
      buyTicketForm.Email = localStorage.getItem('name')
      buyTicketForm.PurchaseDate = new Date();
      console.log("Trenutno vreme", buyTicketForm.PurchaseDate)
      this.buyTicketService.buyTicket(buyTicketForm).subscribe(d=>{
      alert("Succesfull buy ticket");
      });     
    }else if(mail == null){
      if(buyTicketForm.Email.length != 0){
        buyTicketForm.PurchaseDate = new Date();
        buyTicketForm.TypeOfTicket = "TimeLimited";
        this.buyTicketService.buyTicketViaEmail(buyTicketForm).subscribe();
      }else{
        alert("Please enter your email address");
      }    
  }
    
  }

  nonRegister(): boolean{
    if(localStorage.getItem('name') == null)
      return true;
    else 
      return false;
  }



}
