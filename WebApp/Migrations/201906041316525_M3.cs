namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class M3 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.RoleCoefficients", name: "PassangerType_Id", newName: "PassangerTypeId");
            RenameIndex(table: "dbo.RoleCoefficients", name: "IX_PassangerType_Id", newName: "IX_PassangerTypeId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.RoleCoefficients", name: "IX_PassangerTypeId", newName: "IX_PassangerType_Id");
            RenameColumn(table: "dbo.RoleCoefficients", name: "PassangerTypeId", newName: "PassangerType_Id");
        }
    }
}
