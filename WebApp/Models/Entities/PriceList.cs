using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class PriceList
    {
        public int Id { get; set; }
        public DateTime? FromTime { get; set; }
        public DateTime? ToTime { get; set; }

    }
}