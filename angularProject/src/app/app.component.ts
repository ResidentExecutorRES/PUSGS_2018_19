import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProject';

  public loggedIn(): string{
    return localStorage.jwt;
  }

  logout(){
    localStorage.clear();
  }

  public showHide(type: string): boolean{
    if(type == "AppUser")
      return true;
    else
      return false;
  }

}
