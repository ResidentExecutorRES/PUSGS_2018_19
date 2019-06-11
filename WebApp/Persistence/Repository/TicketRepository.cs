using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using WebApp.Models.Entities;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {
        }

        public bool NotifyViaEmail(string targetEmail, string subject, string body)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("pusgs2018.19projekat@gmail.com", "pusgs2019"),
                EnableSsl = true
            };

            client.Send("pusgs2018.19projekat@gmail.com", targetEmail, subject, body);
            return true;
            
        }
    }
}