import { StationModel } from './station.model';

export class LineModel{
    Id: number;
    RegularNumber: number;
    ListOfStations: StationModel[]
    //DepartureId: number;

    constructor(id: number, regularNumber: number, listOfStatios: StationModel[]){
        this.Id = id;
        this.RegularNumber = regularNumber;
        this.ListOfStations = listOfStatios;
    }
}

