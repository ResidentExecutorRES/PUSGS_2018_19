namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migracija1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(),
                        Street = c.String(),
                        Number = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        LastName = c.String(),
                        Activated = c.Boolean(nullable: false),
                        Image = c.String(),
                        Birthaday = c.DateTime(),
                        Address_Id = c.Int(),
                        PassangerType_Id = c.Int(),
                        RoleCoefficient_Id = c.Int(),
                        UserType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Address_Id)
                .ForeignKey("dbo.PassangerTypes", t => t.PassangerType_Id)
                .ForeignKey("dbo.RoleCoefficients", t => t.RoleCoefficient_Id)
                .ForeignKey("dbo.UserTypes", t => t.UserType_Id)
                .Index(t => t.Address_Id)
                .Index(t => t.PassangerType_Id)
                .Index(t => t.RoleCoefficient_Id)
                .Index(t => t.UserType_Id);
            
            CreateTable(
                "dbo.PassangerTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RoleCoefficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Coefficient = c.Double(nullable: false),
                        PassangerType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PassangerTypes", t => t.PassangerType_Id)
                .Index(t => t.PassangerType_Id);
            
            CreateTable(
                "dbo.UserTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Days",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Departures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DayId = c.Int(nullable: false),
                        TimetableId = c.Int(nullable: false),
                        ListOfDepartures = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Days", t => t.DayId, cascadeDelete: true)
                .ForeignKey("dbo.Timetables", t => t.TimetableId, cascadeDelete: true)
                .Index(t => t.DayId)
                .Index(t => t.TimetableId);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegularNumber = c.Int(nullable: false),
                        DepartureId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departures", t => t.DepartureId, cascadeDelete: true)
                .Index(t => t.DepartureId);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        AddressStation = c.String(),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegistrationNumber = c.String(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        LineId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .Index(t => t.LineId);
            
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Line = c.Int(nullable: false),
                        DayType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Days", t => t.DayType_Id)
                .Index(t => t.DayType_Id);
            
            CreateTable(
                "dbo.PriceLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FromTime = c.DateTime(),
                        ToTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TicketPrices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        PriceListId = c.Int(nullable: false),
                        TicketId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PriceLists", t => t.PriceListId, cascadeDelete: true)
                .ForeignKey("dbo.Tickets", t => t.TicketId, cascadeDelete: true)
                .Index(t => t.PriceListId)
                .Index(t => t.TicketId);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PurchaseDate = c.DateTime(),
                        ExpirationDate = c.DateTime(),
                        Valid = c.Boolean(nullable: false),
                        AppUserId = c.String(maxLength: 128),
                        TypeOfTicket_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId)
                .ForeignKey("dbo.TypeOfTickets", t => t.TypeOfTicket_Id)
                .Index(t => t.AppUserId)
                .Index(t => t.TypeOfTicket_Id);
            
            CreateTable(
                "dbo.TypeOfTickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.Line_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
            AddColumn("dbo.AspNetUsers", "AppUserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.AspNetUsers", "AppUserId");
            AddForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.TicketPrices", "TicketId", "dbo.Tickets");
            DropForeignKey("dbo.Tickets", "TypeOfTicket_Id", "dbo.TypeOfTickets");
            DropForeignKey("dbo.Tickets", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.TicketPrices", "PriceListId", "dbo.PriceLists");
            DropForeignKey("dbo.Departures", "TimetableId", "dbo.Timetables");
            DropForeignKey("dbo.Timetables", "DayType_Id", "dbo.Days");
            DropForeignKey("dbo.Vehicles", "LineId", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.Lines", "DepartureId", "dbo.Departures");
            DropForeignKey("dbo.Departures", "DayId", "dbo.Days");
            DropForeignKey("dbo.AppUsers", "UserType_Id", "dbo.UserTypes");
            DropForeignKey("dbo.AppUsers", "RoleCoefficient_Id", "dbo.RoleCoefficients");
            DropForeignKey("dbo.RoleCoefficients", "PassangerType_Id", "dbo.PassangerTypes");
            DropForeignKey("dbo.AppUsers", "PassangerType_Id", "dbo.PassangerTypes");
            DropForeignKey("dbo.AppUsers", "Address_Id", "dbo.Addresses");
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.AspNetUsers", new[] { "AppUserId" });
            DropIndex("dbo.Tickets", new[] { "TypeOfTicket_Id" });
            DropIndex("dbo.Tickets", new[] { "AppUserId" });
            DropIndex("dbo.TicketPrices", new[] { "TicketId" });
            DropIndex("dbo.TicketPrices", new[] { "PriceListId" });
            DropIndex("dbo.Timetables", new[] { "DayType_Id" });
            DropIndex("dbo.Vehicles", new[] { "LineId" });
            DropIndex("dbo.Lines", new[] { "DepartureId" });
            DropIndex("dbo.Departures", new[] { "TimetableId" });
            DropIndex("dbo.Departures", new[] { "DayId" });
            DropIndex("dbo.RoleCoefficients", new[] { "PassangerType_Id" });
            DropIndex("dbo.AppUsers", new[] { "UserType_Id" });
            DropIndex("dbo.AppUsers", new[] { "RoleCoefficient_Id" });
            DropIndex("dbo.AppUsers", new[] { "PassangerType_Id" });
            DropIndex("dbo.AppUsers", new[] { "Address_Id" });
            DropColumn("dbo.AspNetUsers", "AppUserId");
            DropTable("dbo.StationLines");
            DropTable("dbo.TypeOfTickets");
            DropTable("dbo.Tickets");
            DropTable("dbo.TicketPrices");
            DropTable("dbo.PriceLists");
            DropTable("dbo.Timetables");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Stations");
            DropTable("dbo.Lines");
            DropTable("dbo.Departures");
            DropTable("dbo.Days");
            DropTable("dbo.UserTypes");
            DropTable("dbo.RoleCoefficients");
            DropTable("dbo.PassangerTypes");
            DropTable("dbo.AppUsers");
            DropTable("dbo.Addresses");
        }
    }
}
