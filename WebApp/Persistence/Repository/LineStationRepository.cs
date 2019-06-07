using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Entities;

namespace WebApp.Persistence.Repository
{
    public class LineStationRepository : Repository<LineStation, int>, ILineStationRepository
    {
        public LineStationRepository(DbContext context) : base(context)
        {
        }
    }
}