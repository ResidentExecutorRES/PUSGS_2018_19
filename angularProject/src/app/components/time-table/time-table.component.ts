import { Component, OnInit } from '@angular/core';
import { LineService } from 'src/app/services/lineService/line.service';
import { TimetableModel, TimetableModel2 } from 'src/app/models/timetable.model';
import { NgForm } from '@angular/forms';
import { TimetableService } from 'src/app/services/timetableService/timetable.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  selected: string = "";
  allLinesFromDb: any = []
  //tt: TimetableModel2;


  constructor(private lineService: LineService, private timetableService: TimetableService) { 
    this.lineService.getAllLines().subscribe(d=>{
      this.allLinesFromDb = d;
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
