using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class Departure
    {
        public int Id { get; set; }

        [ForeignKey("Day")]
        public int DayId { get; set; }
        public Day Day { get; set; }

        [ForeignKey("Timetable")]
        public int TimetableId { get; set; }
        public Timetable Timetable { get; set; }
        
        public String ListOfDepartures { get; set; }        //svi polasci smjesteni u jednom stringu

        [ForeignKey("Line")]
        public int LineId { get; set; }
        public Line Line { get; set; }


        //public List<Line> ListOfLines { get; set; }
    }
}