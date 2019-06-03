import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { RegistrationModel } from 'src/app/models/registration.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthenticationService]
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }


  onSubmit(loginData: RegistrationModel, form:NgForm){
    console.log(loginData);


    this.authService.logIn(loginData);    
  }

}
