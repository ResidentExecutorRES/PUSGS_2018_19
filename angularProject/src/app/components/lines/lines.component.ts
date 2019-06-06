import { Component, OnInit, NgZone } from '@angular/core';
import { Polyline } from '../map/modelsForMap/polyline';
import { MarkerInfo } from '../map/modelsForMap/marker-info.model';
import { StationModel } from 'src/app/models/station.model';
import { MapsAPILoader } from '@agm/core';
import { StationService } from 'src/app/services/stationService/station.service';
import { GeoLocation } from '../map/modelsForMap/geolocation';
import { LineService } from 'src/app/services/lineService/line.service';
import { LineModel } from 'src/app/models/line.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class LinesComponent implements OnInit {

  selected: string = "";
  public polyline: Polyline;
  id: number;
  public zoom: number;
  stations: any = [];
  markerInfo: MarkerInfo;
  pomStat: StationModel;
  selectedStations: StationModel[] = [];

  iconUrl: any = {url: "assets/busicon.png", scaledSize: {width: 50, height:50}}

  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , private stationService: StationService, private lineService: LineService) { 
    this.stationService.getAllStations().subscribe(data => {
      this.stations = data;
      console.log(this.stations)
    });
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  stationClick(id: number){
    this.stations.forEach(element => {
      if(element.Id == id){
        this.pomStat = element;
      }
    });
    console.log(this.pomStat);
    this.selectedStations.push(this.pomStat);
    this.polyline.addLocation(new GeoLocation(this.pomStat.Latitude, this.pomStat.Longitude));
    this.id = id;
  }

  onSubmit(lineData: LineModel, form: NgForm){
    lineData.ListOfStations = this.selectedStations;
    console.log(lineData);
    this.lineService.addLine(lineData).subscribe(data=>{
      //alert("Add line to db - Successful")
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
