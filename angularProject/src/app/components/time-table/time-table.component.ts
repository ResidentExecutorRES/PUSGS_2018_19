import { Component, OnInit } from '@angular/core';
import { LineService } from 'src/app/services/lineService/line.service';
import { TimetableModel, TimetableModel2, TimetableModel3 } from 'src/app/models/timetable.model';
import { NgForm } from '@angular/forms';
import { TimetableService } from 'src/app/services/timetableService/timetable.service';
import { parse } from 'querystring';
import { element } from 'protractor';
import { DayService } from 'src/app/services/dayService/day.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  selected: string = "";
  allLinesFromDb: any = []
  allTimetablesFromDb: any = [];
  allDaysFromDb: any = []
  //tt: TimetableModel2;

  dayId: number = 0;
  lineId: number = 0;
  timetableId: number = 0;


  constructor(private lineService: LineService, 
              private timetableService: TimetableService, private daysService: DayService) { 
    this.lineService.getAllLines().subscribe(d=>{
      this.allLinesFromDb = d;
    });

    this.timetableService.getAll().subscribe(e =>{
      this.allTimetablesFromDb = e; 
      console.log("TT",this.allTimetablesFromDb);
    })

    this.daysService.getAll().subscribe(d1=>{
        this.allDaysFromDb = d1
        console.log(d1);
    })

    
  }

  ngOnInit() {
  }

  onSubmit(timetableData: TimetableModel, form:NgForm){
      console.log("TimeTable:", timetableData);
      
      // this.tt.DayId = timetableData.DayId;
      // this.tt.LineId = timetableData.LineId;

      // this.tt.Departures = timetableData.Departures.hours.toString() + ":" + timetableData.Departures.minutes.toString()
      var kk: string = "";
      kk = timetableData.Departures.toString()
      var tt = new TimetableModel2(timetableData.LineId, timetableData.DayId, kk);
      console.log(tt);
      this.timetableService.addTimeTable(tt).subscribe();   
  }

  onSubmitDelete(timetableData: TimetableModel3, form:NgForm){
    console.log("TimeTableForDelete:", timetableData);

    
    this.allDaysFromDb.forEach(d => {
      if(d.Name == timetableData.DayId){
        this.dayId = d.Id;
      }
    });


    this.allLinesFromDb.forEach(l => {
      if(l.RegularNumber == timetableData.LineId){
        this.lineId = l.Id;
        
      }
    });


    this.allTimetablesFromDb.forEach(element => {
        if(element.LineId == this.lineId && element.DayId == this.dayId){
            this.timetableId = element.Id;
        }
    });

    this.timetableService.deleteTimetable(this.timetableId).subscribe();

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
