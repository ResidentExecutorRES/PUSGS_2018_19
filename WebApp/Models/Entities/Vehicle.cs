using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Vehicle
    {
        public string RegistrationNumber { get; set; }
        public Double Longitude { get; set; }
        public Double Latitude { get; set; }
        public int IdLine { get; set; }
    }
}