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
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { PomLineModel } from 'src/app/models/pomLineModel.model';

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
  orderedStation: any = [];
  linesWithOrderedStations: any = [];
  
  pomLine: any;

  keys: any = [];
  pomModelList: any = [];
  pomOdPom: PomLineModel;

  linesForComboBox: any = []

  lineForEditString: string = ''
  sLineForEdit: LineModel
  allLinesForEditFromDb: any = []
  orderedStationEdit: any = []

  newLineEdit: any;

  allStationFromDb: any = []

  restStation: any = []

  showComboBoxForAddSt: boolean = false;

  arrayIntForAddStation: any = []

  

  iconUrl: any = {url: "assets/busicon.png", scaledSize: {width: 50, height:50}}

  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , 
    private stationService: StationService, 
    private lineService: LineService, 
    private lineStationService: LineStationService) { 
    this.stationService.getAllStations().subscribe(data => {
      this.stations = data;
      this.allStationFromDb = data
      console.log(this.stations)
    });

    this.stationService.getAll().subscribe(k=>{
      //this.lines = k;
      //console.log("Lineeeee: ", this.lines);    
      this.pomModelList = k;  
      console.log("LineeeeepomModelList: ", this.pomModelList);    

    });

    //if(this.lines.length != 0){
      
   // }

    this.stationService.getIdes().subscribe(ides => {
      this.keys = ides;
      console.log("Keysssss: ", this.keys);
    });

    // this.keys.forEach(element => {
    //   console.log("cc", this.lines[element]);

    //   var p = new PomLineModel(element,this.lines[element]);
    //   this.pomModelList.push(p);
    // });    

    
    
   
    //console.log("linesss[key]", this.lines[])

    

    

    // this.lines.forEach(element => {
    //   this.stationService.getOrderedStations(element.Id).subscribe(p =>{
    //     this.pomLine.ListOfStations = p;
    //     this.pomLine.Id = element.Id;
    //     this.linesWithOrderedStations.push(this.pomLine);
    //   });
    // });
      
      // this.lineStation = new LineStationModel(-1,-1,-1)

      this.lineService.getAllLines().subscribe(s => {
        this.linesForComboBox = s;
        this.allLinesForEditFromDb = s;
        console.log("Linije iz baze: ", this.linesForComboBox)
      })
      
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    // this.keys = Object.keys(this.lines);
    // console.log("keys", this.keys);


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
    this.lineService.addLine(lineData).subscribe(data => {
      alert("Add line successfull!");
    },
    error => {
      alert("Add line - error - already exist!");
      console.log(lineData);
    })

    // this.lineStationService.addLine(lineData).subscribe(data => {
    //   alert("Add lineStation successfull!");
    // },
    // error => {
    //   alert("Add line - error - already exist!");
    // })
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

  onSubmitEdit(lineData: LineModel, form:NgForm){

  }


  showLines(event: any){
    this.selectedForComboBox = event.target.value;

    

    this.linesForComboBox.forEach(element => {
      if(element.RegularNumber == this.selectedForComboBox){
        this.selectedLine = element;     

        // this.linesForEdit.a
        // this.polyline.addLocation(new GeoLocation(element.ListOfStations.Latitude, element.ListOfStations.Longitude));
        
      }
    });

     if(this.selectedLine != null){
       this.stationService.getOrderedStations(this.selectedLine.Id).subscribe(d =>{
         this.orderedStation = d;
         console.log("oS");
         console.log(d);
       });
      }
  }

  showLinesForChange(event: any){
    this.showComboBoxForAddSt = true;
    this.lineForEditString = event.target.value;
    this.allLinesForEditFromDb.forEach(element => {
      if(element.RegularNumber == this.lineForEditString){
        this.sLineForEdit = element;

      }
    });

    if(this.sLineForEdit != null){
      this.stationService.getOrderedStations(this.sLineForEdit.Id).subscribe(d =>{
        this.orderedStationEdit = d;
        console.log("Allll line for change");
        this.newLineEdit = this.sLineForEdit;
      this.newLineEdit.ListOfStations = this.orderedStationEdit;
      console.log("New line",this.newLineEdit);

      this.restStation = this.allStationFromDb.filter(o=> !this.newLineEdit.ListOfStations.find(o2=> o.Id === o2.Id));
      console.log("Rest: ", this.restStation);

      console.log("D", d);

      let countOfArray1 = this.newLineEdit.ListOfStations.length

      console.log("Broj elemenata: ", countOfArray1);

      for (let i = 0; i < countOfArray1; i++) {
        this.arrayIntForAddStation.push(i+1);
      }


      });
      
      

      
      
      
     }

     

    // console.log("Selected line for edit", this.selectedLineForEdit)
    
    // console.log(this.selectedLineForEdit);   
    // this.otherStations = this.stations.filter(o=> !this.selectedLineForEdit.ListOfStations.find(o2=> o.Id === o2.Id));

    // console.log("Other stations: ", this.otherStations);
  }


  removeStationFromLine(id: number){
    var counter = 0;
    this.newLineEdit.ListOfStations.forEach(element => {      
      if(element.Id == id){
        this.newLineEdit.ListOfStations.splice(counter, 1);
        console.log("Izbrisana: ", this.newLineEdit);

      }
      counter++;
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
