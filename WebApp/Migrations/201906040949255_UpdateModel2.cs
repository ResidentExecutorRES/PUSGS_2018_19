namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateModel2 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.AppUsers", name: "RoleCoefficient_Id", newName: "RoleCoefficientId");
            RenameIndex(table: "dbo.AppUsers", name: "IX_RoleCoefficient_Id", newName: "IX_RoleCoefficientId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.AppUsers", name: "IX_RoleCoefficientId", newName: "IX_RoleCoefficient_Id");
            RenameColumn(table: "dbo.AppUsers", name: "RoleCoefficientId", newName: "RoleCoefficient_Id");
        }
    }
}
