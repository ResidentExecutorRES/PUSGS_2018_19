namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateModel : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.AppUsers", name: "PassangerType_Id", newName: "PassangerTypeId");
            RenameColumn(table: "dbo.AppUsers", name: "UserType_Id", newName: "UserTypeId");
            RenameIndex(table: "dbo.AppUsers", name: "IX_PassangerType_Id", newName: "IX_PassangerTypeId");
            RenameIndex(table: "dbo.AppUsers", name: "IX_UserType_Id", newName: "IX_UserTypeId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.AppUsers", name: "IX_UserTypeId", newName: "IX_UserType_Id");
            RenameIndex(table: "dbo.AppUsers", name: "IX_PassangerTypeId", newName: "IX_PassangerType_Id");
            RenameColumn(table: "dbo.AppUsers", name: "UserTypeId", newName: "UserType_Id");
            RenameColumn(table: "dbo.AppUsers", name: "PassangerTypeId", newName: "PassangerType_Id");
        }
    }
}
