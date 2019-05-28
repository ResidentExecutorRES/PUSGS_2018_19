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
        public int Id { get; set; }
        [Required]
        public int RegularNumber { get; set; }

        public List<Station> ListOfStations { get; set; }
        public List<Vehicle> ListOfVehicles { get; set; }

        [ForeignKey("Departure")]
        public int DepartureId { get; set; }
        public Departure Departure { get; set; }
        
    }
}