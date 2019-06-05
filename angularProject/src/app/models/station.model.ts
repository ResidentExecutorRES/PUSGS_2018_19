export class StationModel{
    Name: string;
    Longitude: number;
    Latitude: number;
    AddressStation: string;



    constructor(nameStation:string, longitude:number, latitude:number, address:string){
        this.Name = nameStation;
        this.Longitude = longitude;
        this.Latitude = latitude;
        this.AddressStation = address;
    }
}