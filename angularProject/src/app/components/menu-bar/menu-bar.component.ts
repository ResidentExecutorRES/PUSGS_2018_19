import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  appName: string;
  loggedUser: string;

  constructor() { 
    this.appName = "Public transport";
  }

  ngOnInit() {
  }

  loggedIn(): string{
    if(localStorage.jwt){
      this.loggedUser = localStorage.getItem('name');
    }
    return localStorage.jwt;
  }

  logout(){
    localStorage.clear();
  }

  getRoleAdmin(): boolean{
    if(localStorage.role == 'Admin'){
      return true;
    }
    else{
      return false;
    }
  }

  getRoleController(): boolean{
    if(localStorage.role == 'Controller'){
      return true;
    }
    else{
      return false;
    } 
  }
}
