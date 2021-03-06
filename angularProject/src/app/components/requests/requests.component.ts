import { Component, OnInit } from '@angular/core';
import { PomModelForAuthorization } from 'src/app/models/pomModelForAuth.model';
import { VerificationService } from 'src/app/services/verificationService/verification.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  user: any;
  awaitingAdmins:any = [];
  awaitingControllers:any = [];
  modelHelp: PomModelForAuthorization = new PomModelForAuthorization("");
  
  userBytesImages:any = [];
  imagesLoaded:boolean = false
  wtfList:any = []


  constructor(private verifyService: VerificationService,private usersService: UsersService) { 
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(data => {

       this.user = data;    
      console.log(this.user);    

       verifyService.getAwaitingAdmins().subscribe(data => {
        this.awaitingAdmins = data;
        verifyService.getAwaitingControllers().subscribe(data => {
          this.awaitingControllers = data;
        });
        })
    });

     

   }

   ngOnInit() {
  }

   AuthorizeAdmins(id, i) {
    this.modelHelp.Id = id;
    this.verifyService.authorizeAdmin(this.modelHelp).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Admin has been authorized!");
        this.awaitingAdmins.splice(i,1);
      }

       else alert("Something went wrong");
    })
  }
  AuthorizeControllers(id, i) {
    this.modelHelp.Id = id;
    this.verifyService.authorizeController(this.modelHelp).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Controller has been authorized!");
        this.awaitingControllers.splice(i,1);
      }
       else alert("Something went wrong");
    })
  }

  

  loggedAdmin(): boolean{
    if(localStorage.getItem('role') == "Admin"){
      return true;
    }
    else{
      return false;
    }
  }

  loggedController(): boolean{
    if(localStorage.getItem('role') == "Controller"){
      return true;
    }else{
      return false;
    }

  }

}
