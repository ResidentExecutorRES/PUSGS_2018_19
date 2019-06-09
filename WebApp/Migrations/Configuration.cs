namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;
    using WebApp.Models.Entities;
    using WebApp.Persistence.UnitOfWork;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            { 
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }


            if (!context.PassangerTypes.Any(u => u.Name == "Student"))
            {
                PassangerType p = new PassangerType("Student");
                p.RoleCoefficient = 0.6;
                context.PassangerTypes.Add(p);
                
                //context.RoleCoefficients.Add(new RoleCoefficient(0.5));
            }
            if (!context.PassangerTypes.Any(u => u.Name == "Pensioner"))
            {

                PassangerType p = new PassangerType("Pensioner");
                p.RoleCoefficient = 0.5;

                context.PassangerTypes.Add(p);
                //context.RoleCoefficients.Add(new RoleCoefficient(0.6));


            }
            if (!context.PassangerTypes.Any(u => u.Name == "Default"))
            {
                PassangerType p = new PassangerType("Default");
                p.RoleCoefficient = 1;

                context.PassangerTypes.Add(p);
                //context.RoleCoefficients.Add(new RoleCoefficient(1));


            }
            if (!context.PassangerTypes.Any(u => u.Name == "None"))
            {
                PassangerType p = new PassangerType("None");
                p.RoleCoefficient = 1;
                
                context.PassangerTypes.Add(p);
                //context.RoleCoefficients.Add(new RoleCoefficient(1));

                //context.RoleCoefficients.Add(r);

            }

            if (!context.UserTypes.Any(u => u.Name == "Admin"))
            {
                UserType p = new UserType("Admin");
                context.UserTypes.Add(p);
            }

            if (!context.UserTypes.Any(u => u.Name == "Controller"))
            {
                UserType p = new UserType("Controller");
                context.UserTypes.Add(p);
            }

            if (!context.UserTypes.Any(u => u.Name == "AppUser"))
            {
                UserType p = new UserType("AppUser");
                context.UserTypes.Add(p);
            }

        
           if (!context.Days.Any(u=> u.Name == "Workday"))
            {
                Day d = new Day("Workday");
                context.Days.Add(d);
            }
            if (!context.Days.Any(u => u.Name == "Saturday"))
            {
                Day d = new Day("Saturday");
                context.Days.Add(d);
            }
            if (!context.Days.Any(u => u.Name == "Sunday"))
            {
                Day d = new Day("Sunday");
                context.Days.Add(d);
            }







        }
    }
}
