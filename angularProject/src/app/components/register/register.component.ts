import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { TypesService } from 'src/app/services/types.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService, ]
})

export class RegisterComponent implements OnInit {

  types: any =[];
  constructor(private authService: AuthenticationService, private typesService: TypesService) { 
    typesService.getPassangerAll().subscribe(types =>{
      this.types = types;
    });
  }

  ngOnInit() {
  }

  selected: string = '';

  showPT(event: any){
      this.selected = event.target.value;
  }

  isSelected(): boolean{
    if(this.selected == 'AppUser'){
      return true;
    }
  }

  onSubmit(registrationData: RegistrationModel, form: NgForm) {
     console.log(registrationData);
    this.authService.register(registrationData).subscribe( data => {
      alert("Register successfull!");
    },
    error => {
      alert("Register - error!");
      console.log(registrationData);
    })
  }
}
