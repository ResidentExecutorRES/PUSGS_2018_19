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
                context.PassangerTypes.Add(p);
                context.RoleCoefficients.Add(new RoleCoefficient(0.5));
            }
            if (!context.PassangerTypes.Any(u => u.Name == "Pensioner"))
            {

                PassangerType p = new PassangerType("Pensioner");

                context.PassangerTypes.Add(p);
                context.RoleCoefficients.Add(new RoleCoefficient(0.6));


            }
            if (!context.PassangerTypes.Any(u => u.Name == "Default"))
            {
                PassangerType p = new PassangerType("Default");

                context.PassangerTypes.Add(p);
                context.RoleCoefficients.Add(new RoleCoefficient(1));


            }
            if (!context.PassangerTypes.Any(u => u.Name == "None"))
            {
                PassangerType p = new PassangerType("None");
                //RoleCoefficient r = new RoleCoefficient(1, "None");

                context.PassangerTypes.Add(p);
                context.RoleCoefficients.Add(new RoleCoefficient(1));

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

            //if (!context.RoleCoefficients.Any(u => u.PassangerType.Name == "Student"))
            //{
            //    RoleCoefficient r = new RoleCoefficient(0.6, "Student");
            //    context.RoleCoefficients.Add(r);
            //}
            //else if (!context.RoleCoefficients.Any(u => u.PassangerType.Name == "Pensioner"))
            //{
            //    RoleCoefficient r = new RoleCoefficient(0.5, "Pensioner");
            //    context.RoleCoefficients.Add(r);
            //}
            //else
            //{
            //    RoleCoefficient r = new RoleCoefficient(1, "Default");
            //    context.RoleCoefficients.Add(r);

            //    RoleCoefficient r1 = new RoleCoefficient(1, "None");
            //    context.RoleCoefficients.Add(r1);
            //}


            //var pt = context.PassangerTypes;

            //foreach (var item in pt)
            //{
            //    if (item.Name == "Student")
            //    {
            //        RoleCoefficient r = new RoleCoefficient(0.5, item);
            //        break;
            //    }
            //    else if (item.Name == "Pensioner")
            //    {
            //        RoleCoefficient r = new RoleCoefficient(0.6, item);
            //        break;
            //    }
            //    else
            //    {
            //        RoleCoefficient r = new RoleCoefficient(1, item);
            //        break;
            //    }
            //}

        }
    }
}
