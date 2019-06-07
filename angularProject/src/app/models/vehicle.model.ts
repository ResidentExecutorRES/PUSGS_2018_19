export class VehicleModel{
    Id: number;
    RegistrationNumber: string;
    Longitude: number;
    Latitude: number;
    LineId: number;

    constructor(id: number, registrationNumber: string, longitude: number, latitude: number, lineId: number){
        this.Id = id;
        this.RegistrationNumber = registrationNumber;
        this.Longitude = longitude;
        this.Latitude = latitude;
        this.LineId = lineId;
    }

}

