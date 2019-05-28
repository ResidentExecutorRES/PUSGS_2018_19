using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class TicketPrice
    {
        public Double Price { get; set; }

        [ForeignKey("PriceList")]
        public int PriceListId { get; set; }
        public PriceList PriceList { get; set; }

        public int IdTicket { get; set; }

    }
}