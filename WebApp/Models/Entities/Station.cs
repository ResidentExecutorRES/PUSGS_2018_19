using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address AddressStation { get; set; }
        public Double Longitude { get; set; }
        public Double Latitude { get; set; }
        public List<int> Lines { get; set; }
    }
}