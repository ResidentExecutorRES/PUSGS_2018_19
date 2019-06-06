using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Line
    {
        public Line()
        {
            ListOfDepartures = new List<Departure>();
            ListOfStations = new List<Station>();
            ListOfVehicles = new List<Vehicle>();
        }

        public int Id { get; set; }
        [Required]
        public int RegularNumber { get; set; }

        public List<Station> ListOfStations { get; set; }
        public List<Vehicle> ListOfVehicles { get; set; }

        public List<Departure> ListOfDepartures { get; set; }

        //[ForeignKey("Departure")]
        //public int DepartureId { get; set; }
        //public Departure Departure { get; set; }
        
    }
}