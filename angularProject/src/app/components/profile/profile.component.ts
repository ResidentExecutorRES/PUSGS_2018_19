import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { RegistrationModel } from 'src/app/models/registration.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})

export class ProfileComponent implements OnInit {

  user: any;

  constructor(private usersService: UsersService) {
    console.log(usersService);
    this.requestUserInfo();
   }

  ngOnInit() {
  }

  getRole(): string {
    return localStorage.role;
  }

  

  requestUserInfo(){
    this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(claims['Email']).subscribe(data => {
        this.user = data;
        console.log("User::" + this.user);
      
      })
    })
  }
}
