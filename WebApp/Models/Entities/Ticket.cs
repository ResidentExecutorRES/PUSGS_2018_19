﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{

    public class Ticket
    {
        public int Id { get; set; }
        public TypeOfTicket TypeOfTicket { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public bool Valid { get; set; }

        [ForeignKey("AppUser")]
        public String AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}