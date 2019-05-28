using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Entities;

namespace WebApp.Persistence.Repository
{
    public class AppUserRepository : Repository<AppUser, string>, IAppUserepository
    {
        public AppUserRepository(DbContext context) : base(context)
        {
        }
    }
}