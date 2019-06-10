export class PomModelForBuyTicket{
    Email: string;
    TypeOfTicket: string;
    

    constructor(email: string, typeOfTicket: string){
        this.Email = email;
        this.TypeOfTicket = typeOfTicket;    
    }
}
