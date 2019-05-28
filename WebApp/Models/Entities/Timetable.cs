using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Timetable
    {
        public int Id { get; set; }
        public Day DayType { get; set; }
        public int Line { get; set; }

        public List<Departure> ListOfDepartures { get; set; }   

    }
}