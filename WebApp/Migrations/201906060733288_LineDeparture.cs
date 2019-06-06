namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineDeparture : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Lines", "DepartureId", "dbo.Departures");
            DropIndex("dbo.Lines", new[] { "DepartureId" });
            AddColumn("dbo.Departures", "LineId", c => c.Int(nullable: false));
            CreateIndex("dbo.Departures", "LineId");
            AddForeignKey("dbo.Departures", "LineId", "dbo.Lines", "Id", cascadeDelete: true);
            DropColumn("dbo.Lines", "DepartureId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Lines", "DepartureId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Departures", "LineId", "dbo.Lines");
            DropIndex("dbo.Departures", new[] { "LineId" });
            DropColumn("dbo.Departures", "LineId");
            CreateIndex("dbo.Lines", "DepartureId");
            AddForeignKey("dbo.Lines", "DepartureId", "dbo.Departures", "Id", cascadeDelete: true);
        }
    }
}
