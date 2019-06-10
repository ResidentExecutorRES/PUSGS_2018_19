namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migrationNew : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TicketPrices", "TicketId", "dbo.Tickets");
            DropIndex("dbo.TicketPrices", new[] { "TicketId" });
            AddColumn("dbo.TicketPrices", "TypeOfTicketId", c => c.Int(nullable: false));
            AddColumn("dbo.Tickets", "TicketPriceId", c => c.Int(nullable: false));
            CreateIndex("dbo.TicketPrices", "TypeOfTicketId");
            CreateIndex("dbo.Tickets", "TicketPriceId");
            AddForeignKey("dbo.TicketPrices", "TypeOfTicketId", "dbo.TypeOfTickets", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Tickets", "TicketPriceId", "dbo.TicketPrices", "Id", cascadeDelete: true);
            DropColumn("dbo.TicketPrices", "TicketId");
            DropColumn("dbo.Tickets", "PurchaseDate");
            DropColumn("dbo.Tickets", "ExpirationDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tickets", "ExpirationDate", c => c.DateTime());
            AddColumn("dbo.Tickets", "PurchaseDate", c => c.DateTime());
            AddColumn("dbo.TicketPrices", "TicketId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Tickets", "TicketPriceId", "dbo.TicketPrices");
            DropForeignKey("dbo.TicketPrices", "TypeOfTicketId", "dbo.TypeOfTickets");
            DropIndex("dbo.Tickets", new[] { "TicketPriceId" });
            DropIndex("dbo.TicketPrices", new[] { "TypeOfTicketId" });
            DropColumn("dbo.Tickets", "TicketPriceId");
            DropColumn("dbo.TicketPrices", "TypeOfTicketId");
            CreateIndex("dbo.TicketPrices", "TicketId");
            AddForeignKey("dbo.TicketPrices", "TicketId", "dbo.Tickets", "Id", cascadeDelete: true);
        }
    }
}
