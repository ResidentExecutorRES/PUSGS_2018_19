using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Departure
    {
        public int Id { get; set; }
        public int IdDay { get; set; }
        public List<TimeSpan> ListofDepartures { get; set; }
    }
}