import { Component, OnInit } from '@angular/core';
import { LineModel } from 'src/app/models/line.model';
import { VehicleService } from 'src/app/services/vehicleService/vehicle.service';
import { LineService } from 'src/app/services/lineService/line.service';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  selected: string = ''
  RegistrationNumber: string =  ''
  Longitude: number
  Latitude: number

  lines: any = []


  constructor(private vehicleService: VehicleService, private lineService: LineService) { 
    lineService.getAllLines().subscribe(data => {
      this.lines = data;
      console.log(this.lines);
      
    })
  }

  ngOnInit() {
  }

  onSubmit(vehicleData: VehicleModel, form:NgForm){
    
    this.vehicleService.addVehicle(vehicleData).subscribe(data => {
     
      console.log(data);

 
    });

   
    
  }


  showAdd(){
    this.selected = "Add";
  }

  showEdit(){
    this.selected = "Edit";
  }

  showDelete(){
    this.selected = "Delete";
  }

  isSelectedAdd(): boolean{
    if(this.selected == 'Add'){
      return true;
    }
  }

  isSelectedEdit(): boolean{
    if(this.selected == 'Edit'){
      
      return true;
    }
  }

  isSelectedDelete(): boolean{
    if(this.selected == 'Delete'){
      return true;
    }
  }

}
