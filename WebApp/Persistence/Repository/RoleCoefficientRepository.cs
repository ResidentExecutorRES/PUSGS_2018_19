using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Entities;

namespace WebApp.Persistence.Repository
{
    public class RoleCoefficientRepository : Repository<RoleCoefficient, int>, IRoleCoefficientRepository
    {
        public RoleCoefficientRepository(DbContext context) : base(context)
        {
        }
    }
}