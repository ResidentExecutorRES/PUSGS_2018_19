import { Component, OnInit, NgZone } from '@angular/core';
import { GeoLocation } from '../map/modelsForMap/geolocation';
import { MarkerInfo } from '../map/modelsForMap/marker-info.model';
import { StationService } from 'src/app/services/stationService/station.service';
import { MapsAPILoader } from '@agm/core';
import { StationModel } from 'src/app/models/station.model';
import { NgForm } from '@angular/forms';

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

  constructor(private ngZone: NgZone, private mapsApiLoader: MapsAPILoader,private stationService: StationService) {}

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
