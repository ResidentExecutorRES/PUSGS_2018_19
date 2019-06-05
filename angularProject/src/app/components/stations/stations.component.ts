import { Component, OnInit, NgZone } from '@angular/core';
import { GeoLocation } from '../map/modelsForMap/geolocation';
import { MarkerInfo } from '../map/modelsForMap/marker-info.model';
import { StationService } from 'src/app/services/stationService/station.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { StationModel } from 'src/app/models/station.model';
import { NgForm } from '@angular/forms';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class StationsComponent implements OnInit {
  private selected: string = '';
  coordinates: GeoLocation = new GeoLocation(0,0); 
  markerInfo: MarkerInfo;
  private geocoder : any;


  // street: string;
  // city: string;
  // numberStreet: string;
  address: string;

  stations: any = [];
  markers: any = [];
  iconUrl: any = {url: "assets/busicon.png", scaledSize: {width: 50, height:50}}

  newStation: StationModel
  nameOfStation: string
  id: number



  constructor(private ngZone: NgZone, private mapsApiLoader: MapsAPILoader,private stationService: StationService) {
    this.stationService.getAllStations().subscribe(st =>{
      this.stations = st;
    });
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  
    this.mapsApiLoader.load().then(() =>{
      this.geocoder = new google.maps.Geocoder();
    });

  }

  onSubmit(stationData: StationModel, form: NgForm){

    stationData.Latitude = this.coordinates.latitude;
    stationData.Longitude = this.coordinates.longitude;
    stationData.AddressStation = this.address;

    console.log(stationData);
    this.stationService.addStation(stationData).subscribe(data => {
      alert("Station successfull!");
    },
    error => {
      alert("Station - error!");

    });
  }

  onSubmitEdit(stationData: StationModel, form: NgForm){

    stationData.Latitude = this.coordinates.latitude;
    stationData.Longitude = this.coordinates.longitude;
    stationData.AddressStation = this.address;
    stationData.Name = this.nameOfStation;
    stationData.Id = this.id;

    this.stationService.editStation(stationData).subscribe();
      
  }

  markerDragEnd($event: MouseEvent, name:string, id: number) {
    console.log($event);
     this.coordinates.latitude = $event.coords.lat;
     this.coordinates.longitude = $event.coords.lng;
     this.getAddress(this.coordinates.latitude, this.coordinates.longitude);
     this.nameOfStation = name;
     this.id = id;
     console.log(id);
  }

  stationClick(id: number){
    this.id = id;
  }

  placeMarker1($event){
    this.coordinates = new GeoLocation($event.coords.lat, $event.coords.lng);
    this.getAddress(this.coordinates.latitude,this.coordinates.longitude);
  }


  getAddress(latitude: number,longitude:number){
    this.geocoder.geocode({'location': {lat: latitude, lng: longitude}}, (results,status) =>{
      console.log(results);
      if(status === 'OK'){
          if(results[0]){
            this.address = results[0].formatted_address;
          }
          else{
            window.alert('no results found');
          }
      }
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
