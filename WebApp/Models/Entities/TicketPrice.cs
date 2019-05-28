using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class TicketPrice
    {
        public int Id { get; set; }
        
        public Double Price { get; set; }

        [ForeignKey("PriceList")]
        public int PriceListId { get; set; }
        public PriceList PriceList { get; set; }

        [ForeignKey("Ticket")]
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}