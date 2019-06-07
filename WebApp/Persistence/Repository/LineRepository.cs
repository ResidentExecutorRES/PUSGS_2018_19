using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models.Entities;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        protected ApplicationDbContext applicationDb { get { return context as ApplicationDbContext; } }
        //ApplicationDbContext applicationDb = new ApplicationDbContext();
        public LineRepository(DbContext context) : base(context)
        {

        }

        public IEnumerable<Line> CompleteLine()
        {
            var v = applicationDb.Lines.Include(p=> p.ListOfStations).ToList();
            //var v = db.Lines.Include(p => p.ListOfStations).ToList();
            return v;
        }
    }
}