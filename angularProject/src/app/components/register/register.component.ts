import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationModule } from 'src/app/models/registration.model';
import { AuthenticationService } from 'src/app/services/authentication-service.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService) { 
  }

  ngOnInit() {
  }

  onSubmit(registrationData: AuthenticationModule, form: NgForm) {
    console.log(registrationData);

    // Todo call Service and send register request
    this.authService.register(registrationData)
    .subscribe( data => {
      alert("Register successful!");
    },
    error => {
      alert("Error!");
    })
  }


}
