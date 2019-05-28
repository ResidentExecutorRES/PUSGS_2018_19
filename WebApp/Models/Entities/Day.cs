using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Day
    {
        public string Id { get; set; }
        public List<Departure> ListOfDepatures { get; set; }
    }

    public enum DayType
    {
        Workday,
        Saturday,
        Sunday
    }
}