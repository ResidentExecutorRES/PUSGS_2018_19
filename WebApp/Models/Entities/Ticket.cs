using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public enum TypeOfTicket
    {
        TimeLimited, Daily, Monthly, Annual
    }
    public class Ticket
    {
        public int Id { get; set; }
        public TypeOfTicket TypeOfTicket { get; set; }
        public DateTime DateTime { get; set; }
    }
}