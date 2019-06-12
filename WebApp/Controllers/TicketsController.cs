using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models.Entities;
using WebApp.Models.PomModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Tickets")]
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        IUnitOfWork _unitOfWork;

        protected TicketsController()
        {
        }

        public TicketsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Tickets
        [Route("GetAllTypeOfTicket")]
        public IQueryable<TypeOfTicket> GetTickets()
        {
            return _unitOfWork.TypeOfTickets.GetAll().AsQueryable();
        }

        // GET: api/Tickets/5
        [Route("GetTicket")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = _unitOfWork.Tickets.GetTicketWithInclude(id);

            if (ticket == null)
            {
                return NotFound();
            }
            if (ticket.AppUserId != null)
            {
                ticket.AppUserId = ticket.AppUser.Email;
            }


            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            db.Entry(ticket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("Add")]
        // POST: api/Tickets
        //[ResponseType(typeof(void))]
        public IHttpActionResult PostTicket(PomModelForBuyTicket pom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Ticket ticket = new Ticket();

            AppUser appUser = _unitOfWork.AppUsers.Find(user => user.Email == pom.Email).FirstOrDefault();
            TypeOfTicket tt = _unitOfWork.TypeOfTickets.Find(s => s.Name == pom.TypeOfTicket).FirstOrDefault();

            TicketPrice ticketPrice = _unitOfWork.TicketPrices.Find(a => a.TypeOfTicketId == tt.Id).FirstOrDefault();

            double coeff = _unitOfWork.PassangerTypes.Find(dd => dd.Id == appUser.PassangerTypeId).FirstOrDefault().RoleCoefficient;
            double c = ticketPrice.Price - (ticketPrice.Price * coeff);

            ticket.PriceOfTicket = c;

            ticket.AppUserId = appUser.Id;
            ticket.TicketPriceId = ticketPrice.Id;
            ticket.Valid = true;
            ticket.PurchaseDate = DateTime.Now;
            ticket.TypeOfTicketId = tt.Id;
            ticket.Email = pom.Email;

            _unitOfWork.Tickets.Add(ticket);
            _unitOfWork.Complete();

            return Ok(ticket.Id);
        }


        [Route("SendMail")]
        public string SendMail(PomModelForBuyTicket ticket)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState).ToString();
            }

            string subject = "Ticket purchase";
            string desc =   $"Dear {ticket.Email},\nYour purchase is successfull.\n " +
                $"Ticket price: {_unitOfWork.TicketPrices.Find(a => a.TypeOfTicketId == a.Id).FirstOrDefault().Price} din\n " +
                            $"Type of ticket:Time Limited\n" +
                            $"Time of purchase: {DateTime.Now}\n" +
                            $"Ticket is valid for the next hour.\n\n" +
                            $"Thank you.";
            var email = ticket.Email;
            TypeOfTicket tt = _unitOfWork.TypeOfTickets.Find(s => s.Name == ticket.TypeOfTicket).FirstOrDefault();
            TicketPrice ticketPrice = _unitOfWork.TicketPrices.Find(a => a.TypeOfTicketId == tt.Id).FirstOrDefault();

            Ticket storeTicket = new Ticket();
            storeTicket.Email = email;
            storeTicket.PriceOfTicket = ticketPrice.Price;
            storeTicket.PurchaseDate = DateTime.Now;
            storeTicket.TypeOfTicketId = tt.Id;
            storeTicket.Valid = true;
            storeTicket.TicketPriceId = ticketPrice.Id;

            _unitOfWork.Tickets.NotifyViaEmail(email, subject, desc);
            _unitOfWork.Tickets.Add(storeTicket);
            _unitOfWork.Complete();

            return "Ok";

        }


        // DELETE: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            db.SaveChanges();

            return Ok(ticket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}