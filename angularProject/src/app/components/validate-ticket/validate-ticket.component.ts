import { Component, OnInit } from '@angular/core';
import { ValidateTicketService } from 'src/app/services/validateTicketService/validate-ticket.service';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.css']
})
export class ValidateTicketComponent implements OnInit {

  ticketForV : any;
  ticketExists: string = "";
  ticketMessage: string = "";
  allTT: any ;

  constructor(private ticketServ: ValidateTicketService) { 
    this.ticketServ.getAllTypeOfTicket().subscribe(data => {
      this.allTT = data;
    })
  }

  ngOnInit() {
  }


  FindTicket(n:any){
 
    console.log(n);
    this.ticketServ.getTicket(n).subscribe(data => {
      this.ticketForV = data;
      
      if(this.ticketForV)
      {
          this.ticketExists = "";
          if(this.ticketForV.AppUserId == "" || this.ticketForV.AppUserId == undefined || this.ticketForV.AppUserId == null)
          {
            this.ValidateTicketNoUser();
          }
      }
      else{
        this.ticketExists = "Ticket doesn't exist in database!"
      }
    });
    
  }

  ValidateTicketNoUser()
  {
    
  
    let d : Date = new Date(this.ticketForV.PurchaseTime);

    d.setHours(d.getHours() + 1);
        if(d < new Date())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else
        {
          this.ticketMessage = "Ticket is valid."
        }
    }
  

  
  ValidateTicket(n: any)
  {
    let TT : string = "";
    this.allTT.forEach(element => {
      if(this.ticketForV.TypeOfTicketId == element.Id)
      {
          TT = element.Name;
      }      
    });
  
    let d : Date = new Date(this.ticketForV.PurchaseTime);

    if(n == this.ticketForV.ApplicationUserId)
    {

      if(TT == "TimeLimited")
      {
        d.setHours(d.getHours() + 1);
        if(d < new Date())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else
        {
          this.ticketMessage = "Ticket is valid."
        }
      }

      if(TT == "Daily")
      {
        if(d.getFullYear() < new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else if(d.getFullYear() == new Date().getFullYear())
        {
          if(d.getMonth() < new Date().getMonth())
          {
            this.ticketMessage = "Ticket is not valid. Time is up!"
          }else if(d.getMonth() == new Date().getMonth())
          {
            if(d.getDate() == new Date().getDate())
            {
              this.ticketMessage = "Ticket is valid."
            }
            else{
              this.ticketMessage = "Ticket is not valid. Time is up!"
            }
          
          }
        }
      }

      if(TT == "Monthly")
      {
        if(d.getFullYear() < new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else if(d.getFullYear() == new Date().getFullYear())
        {
          if(d.getMonth() == new Date().getMonth())
          {
            this.ticketMessage = "Ticket is valid."
          }
          else{
            this.ticketMessage = "Ticket is not valid. Time is up!"
          }
         
        }
      }

      if(TT == "Annual")
      {
        if(d.getFullYear() == new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is valid."
        }
        else
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }
      }

    }else
    {
      this.ticketMessage = "User with email: " + n + " did not buy ticket with Id: " + this.ticketForV.Id;
    }
  }

}
