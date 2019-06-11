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

  modell: any;

  showImageBool: boolean = false;
  selectedImage: any;

  showApplyButton: boolean = false;

  constructor(private usersService: UsersService) {
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(data=>{
      this.user = data;
      //this.modell = data;
      console.log("Korisnik", data);
   
      //this.dateForEdit = this.user.Birthaday
      //this.idAdressFromDb = this.user.AddressId;

      //console.log("Imageeee", this.user.Image);

      if(this.user.Image == null){
        this.showImageBool = true;
      }else{
        this.showImageBool = false;
      }

    })
      // this.modell.Name = this.user.Name;
      // this.modell.LastName = this.user.LastName;
      // //let newDate = new Date(dateString);
      // this.modell.Birthaday = this.user.Birthaday.split('T')[0];
  
      // //this.userForEdit.Image = this.user.Image;
      // this.modell.AddressId = this.user.AddressId;
      // this.modell.Email = this.user.Email;
      // //password se ne podesava
  
      // this.usersService.getAdressInfo(this.user.AddressId).subscribe(s=>{
      // this.addressFromDb = s;
      // this.modell.City = this.addressFromDb.City;
      // this.modell.Number = this.addressFromDb.Number;
      // this.modell.Street = this.addressFromDb.Street;

      // console.log("Korisnik: ", this.user);
      // console.log("Dataaaa: ", this.dateForEdit)
      // console.log("Id adresss: ", this.idAdressFromDb)
    //})
  
    this.userForEdit = new PomAppUserModel("", "", "", "", "", "", "", "", -1);
  }

  ngOnInit() {
  }

  getRole(): string {
    return localStorage.role;
  }

 
  onSubmit(userForEdit: PomAppUserModel, form: NgForm){
    console.log("Korisnik za izmjenu: ", this.userForEdit);

    console.log("Atresaaa: ", this.addressFromDb)
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

  showImage(event){
    this.selectedImage = event.target.files;
    
      this.showApplyButton = true;
    
  }

  ApplyImage(){
        this.userForEdit.Id = this.user.Id;
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
        if(this.selectedImage == undefined)
      alert("No image selected! ");
    else{
      this.usersService.uploadFile(this.selectedImage).subscribe(d=>{
        alert("Image upload successful!");
        console.log("d", d)
        this.usersService.editAppUser(this.userForEdit).subscribe(dd=>{
          //alert("Image upload successful! ");        
          // console.log("DDDDDDDDD", d)

        })
      });
    }
        }); 

    
  }

  onFileSelected(event){
    this.selectedImage = event.target.files;
    
      this.showApplyButton = true;

    this.selectedImage = event.target.files;
  }
}