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
import { IconSequence } from '@agm/core/services/google-maps-types';
import { LineStationModel } from 'src/app/models/lineStation.model';
import { LineStationService } from 'src/app/services/lineStationService/line-station.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class LinesComponent implements OnInit {

  selectedForComboBox: string = '';
  selected: string = "";
  public polyline: Polyline;
  id: number;
  public zoom: number;
  stations: any = [];
  markerInfo: MarkerInfo;
  pomStat: StationModel;
  selectedStations: StationModel[] = [];
  lines: any = [];

  linesForEdit: any = []

  selectedLine: LineModel

  selectedForEdit: string = ''

  selectedLineForEdit: LineModel
  otherStations: any = [];

  lineStations: LineStationModel[] = []
  lineStation: LineStationModel

  counterForStation: number = 0

  

  iconUrl: any = {url: "assets/busicon.png", scaledSize: {width: 50, height:50}}

  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , 
    private stationService: StationService, 
    private lineService: LineService, 
    private lineStationService: LineStationService) { 
    this.stationService.getAllStations().subscribe(data => {
      this.stations = data;
      console.log(this.stations)
    });

    this.lineService.getAllLines().subscribe(data2 =>{
      this.lines = data2;
      console.log("Linije: ", this.lines);   
      });

      // this.lineStation = new LineStationModel(-1,-1,-1)
      
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

    // this.selectedStations.forEach(e => {
    //   this.counterForStation++;
    //   this.lineStation.OrdinalNumber = this.counterForStation;
    //   this.lineStation.StationId = e.Id;
      

    //   this.lineStations.push(this.lineStation);
    // })

    console.log(lineData);
    this.lineService.addLine(lineData).subscribe(data => {
      alert("Add line successfull!");
    },
    error => {
      alert("Add line - error - already exist!");
      console.log(lineData);
    })

    this.selectedStations.forEach(e1=>{
      this.lineStation.LineId = lineData.Id;
      this.counterForStation++;
      this.lineStation.OrdinalNumber = this.counterForStation;
      this.lineStation.StationId = e1.Id;

      this.lineStations.push(this.lineStation);
      
    })

    this.lineStationService.addLine(this.lineStations).subscribe(data => {
      alert("Add lineStation successfull!");
      console.log(data);
    },
    error => {
      alert("Add lineStation - error - already exist!");
      
    });

  }

  onSubmitDelete(lineData: LineModel, form:NgForm){
    this.lineService.deleteLine(this.selectedLine.Id).subscribe(data => {
      alert("Delete line successfull!");
    },
    error => {
      alert("Delete line - error!");
      console.log(lineData);
    })
  }


  showLines(event: any){
    this.selectedForComboBox = event.target.value;
    this.lines.forEach(element => {
      if(element.RegularNumber == this.selectedForComboBox){
        this.selectedLine = element;
        // this.linesForEdit.a
        // this.polyline.addLocation(new GeoLocation(element.ListOfStations.Latitude, element.ListOfStations.Longitude));
        
      }
    });
  }

  showLinesFromComboBox(event: any){
    this.selectedForEdit = event.target.value;
    this.lines.forEach(element => {
      if(element.RegularNumber == this.selectedForEdit){
        this.selectedLineForEdit = element;
        this.selectedLineForEdit.ListOfStations.forEach(element2 =>{
          element2.Checked = true;
        })
      }
    });

    console.log("Selected line for edit", this.selectedLineForEdit)
    
    console.log(this.selectedLineForEdit);   
    this.otherStations = this.stations.filter(o=> !this.selectedLineForEdit.ListOfStations.find(o2=> o.Id === o2.Id));

    console.log("Other stations: ", this.otherStations);
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

  isTrue(name:string):boolean{
    if(this.selectedLineForEdit != null){
      this.selectedLineForEdit.ListOfStations.forEach(element => {
        if(element.Name == name){
          element.Checked = true;
          return true;
        }
      });
    }
    return false;
  }



}
