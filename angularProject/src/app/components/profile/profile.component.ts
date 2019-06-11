import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { RegistrationModel } from 'src/app/models/registration.model';
import { PomAppUserModel } from 'src/app/models/pomAppUser.model';
import { NgForm } from '@angular/forms';
import { PomModelForPassword } from 'src/app/models/PomModelForPassword.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})

export class ProfileComponent implements OnInit {
  selected: string = "";
  user: any;
  userForEdit: PomAppUserModel;

  ClickedButtonEdit: boolean = false;
  addressFromDb: any = []

  idAdressFromDb: number;
  dateForEdit: any = []

  modell: PomAppUserModel;

  constructor(private usersService: UsersService) {
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(data=>{
      this.user = data;
      this.dateForEdit = this.user.Birthaday
      this.idAdressFromDb = this.user.AddressId;

      console.log("Korisnik: ", this.user);
      console.log("Dataaaa: ", this.dateForEdit)
      console.log("Id adresss: ", this.idAdressFromDb)
    })
    this.userForEdit = new PomAppUserModel("", "", "", "", "", "", "", "", -1);
    
   }

  ngOnInit() {
  }

  getRole(): string {
    return localStorage.role;
  }

  

  // requestUserInfo(){
  //   this.usersService.getUserClaims().subscribe(claims => {
  //     this.usersService.getUserData(claims['Email']).subscribe(data => {
  //       this.user = data;
  //       console.log("User::" + this.user);
      
  //     })
  //   })

  //   this.usersService.getUserData(localStorage.getItem('name')).subscribe(d=>{
  //     this.user = d;
  //     console.log("U", this.user);
  //   })

  // }

  // editUserInfo($event){
  //   this.ClickedButtonEdit = true;

  //   this.userForEdit.Id = this.user.Id;
  //   this.userForEdit.Name = this.user.Name;
  //   this.userForEdit.LastName = this.user.LastName;
  //   //let newDate = new Date(dateString);
  //   this.userForEdit.Birthaday = this.user.Birthaday.split('T')[0];

  //   //this.userForEdit.Image = this.user.Image;
  //   this.userForEdit.AddressId = this.user.AddressId;
  //   this.userForEdit.Email = this.user.Email;
  //   //password se ne podesava

  //   this.usersService.getAdressInfo(this.user.AddressId).subscribe(s=>{
  //   this.addressFromDb = s;
  //   this.userForEdit.City = this.addressFromDb.City;
  //   this.userForEdit.Number = this.addressFromDb.Number;
  //   this.userForEdit.Street = this.addressFromDb.Street;

  //   console.log("Adresaaaa: ", this.addressFromDb);
  //   });   
  // }

  onSubmit(userForEdit: PomAppUserModel, form: NgForm){
    console.log("Korisnik za izmjenu: ", this.userForEdit);

    console.log("Atresaaa: ", this.addressFromDb)
    this.modell = userForEdit
    userForEdit.AddressId = this.idAdressFromDb
    userForEdit.Id = this.user.Id
    this.usersService.editAppUser(userForEdit).subscribe();
    
  }

  onSubmitPassword(pomModelForPassword: PomModelForPassword, form:NgForm){
      this.usersService.editPassword(pomModelForPassword).subscribe();
  }

  isSelectedPassword(): boolean{
    if(this.selected == 'Password'){
      return true;
    }
  }

  isSelectedEdit(): boolean{
    if(this.selected == 'Edit'){
      return true;
    }
  }

  showEdit(){
    console.log("User:", this.user)
    this.selected = "Edit";
    this.ClickedButtonEdit = true;

    //this.userForEdit.Id = this.user.Id;
    this.userForEdit.Name = this.user.Name;
    this.userForEdit.LastName = this.user.LastName;
    //let newDate = new Date(dateString);
    this.userForEdit.Birthaday = this.user.Birthaday.split('T')[0];

    //this.userForEdit.Image = this.user.Image;
    this.userForEdit.AddressId = this.user.AddressId;
    this.userForEdit.Email = this.user.Email;
    //password se ne podesava

    this.usersService.getAdressInfo(this.user.AddressId).subscribe(s=>{
    this.addressFromDb = s;
    this.userForEdit.City = this.addressFromDb.City;
    this.userForEdit.Number = this.addressFromDb.Number;
    this.userForEdit.Street = this.addressFromDb.Street;

    console.log("Adresaaaa: ", this.addressFromDb);
    });   
  }

  showPassword(){
    this.selected = "Password";
  }

}