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
    // console.log(registrationData);

    this.authService.register(registrationData).subscribe(); 
    //data => {
    //   alert("Register successfull!");
    // },
    // error => {
    //   alert("Error!");
    // })
  }


}
