using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public enum DayType { Sunday, Saturday, Workday}
    public class Timetable
    {
        public int Id { get; set; }
        public DayType DayType { get; set; }
        public int Line { get; set; }
        public string Departure { get; set; }

    }
}