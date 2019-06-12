import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { TypesService } from 'src/app/services/types.service';
import { UsersService } from 'src/app/services/users/users.service';
import { RequestsService } from 'src/app/services/requestsService/requests.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})

export class RegisterComponent implements OnInit {

  types: any =[];

  selectedImage: any;
  // selIm: string  = "C:/Users/suzana/Pictures/SavedPictures.png";
  userBytesImage: any;

  constructor(private authService: AuthenticationService, 
    private typesService: TypesService,
    private userService: UsersService,
    private notificationServ: RequestsService) { 
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
    if (this.selectedImage == undefined){
      //alert("No image selected!");
      this.authService.register(registrationData).subscribe(d1=>{
        if(registrationData.UserType == 'AppUser'){
          this.notificationServ.sendNotification();
        }
      });
     //return; 
   }
   else{
     this.userService.uploadFile(this.selectedImage).subscribe(d2=>{
       this.authService.register(registrationData).subscribe(d3=>{
         if(registrationData.UserType != 'Admin'){
           this.notificationServ.sendNotification();
         }
       });
     });
   }
  //  this.userService.uploadFile(this.selectedImage).subscribe(data1 => {      
      
  //     this.authService.register(registrationData).subscribe( data => {
  //       alert("Register successfull!");
  //     },
  //     error => {
  //       alert("Register - error!");
  //       console.log(registrationData);
  //     })
  //  })
  }

  onFileSelected(event){
    this.selectedImage = event.target.files;
  }
}
