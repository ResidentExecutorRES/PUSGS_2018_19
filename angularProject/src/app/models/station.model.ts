export class StationModel{
    Id: number;
    Name: string;
    Longitude: number;
    Latitude: number;
    AddressStation: string;
    // Draggable: boolean;



    constructor(nameStation:string, longitude:number, latitude:number, address:string, id:number){
        this.Id = id;
        this.Name = nameStation;
        this.Longitude = longitude;
        this.Latitude = latitude;
        this.AddressStation = address;
        // this.Draggable = true;
    }
}