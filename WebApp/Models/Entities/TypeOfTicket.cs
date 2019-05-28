using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class TypeOfTicket
    {
        public int Id { get; set; }
        public string Name { get; set; }
       
    }

    public enum TicketTypeEnum
    {
        TimeLimited,
        Daily,
        Monthly,
        Annual
    }
}