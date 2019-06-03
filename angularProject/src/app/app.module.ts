import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { BusLinesComponent } from './components/bus-lines/bus-lines.component';
import { CvlComponent } from './components/cvl/cvl.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/interceptor';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


const Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "logIn",
    component: LogInComponent
  },
  {
    path: "logout",
    component: HomeComponent
  },
  {
    path: "busLines",
    component: BusLinesComponent
  },
  {
    path: "priceList",
    component: PriceListComponent
  },
  {
    path: "cvl",
    component: CvlComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    BusLinesComponent,
    CvlComponent,
    PriceListComponent,
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
