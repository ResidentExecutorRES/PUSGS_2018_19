using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Line
    {
        public int Id { get; set; }
        public int RegularNumber { get; set; }
        public List<int> ListOfStations { get; set; }

    }
}