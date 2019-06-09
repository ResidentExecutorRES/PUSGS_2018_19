import { Time } from '@angular/common';

export class TimetableModel{
    LineId: number;
    DayId: string;
    Departures: Time


    constructor(lineId: number, dayId: string, departures: Time){
        this.LineId = lineId;
        this.DayId = dayId;
        this.Departures = departures;
    }
}
export class TimetableModel2{
    LineId: number;
    DayId: string;
    Departures: string

    constructor(lineId: number, dayId: string, departures: string){
        this.LineId = lineId;
        this.DayId = dayId;
        this.Departures = departures;
    }
}

export class TimetableModel3{
    LineId: number;
    DayId: string;

    constructor(lineId: number, dayId: string){
        this.LineId = lineId;
        this.DayId = dayId;
    }
}
