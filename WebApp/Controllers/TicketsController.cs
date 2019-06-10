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
        public IQueryable<Ticket> GetTickets()
        {
            return db.Tickets;
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
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

            _unitOfWork.Tickets.Add(ticket);
            _unitOfWork.Complete();

            return Ok(ticket.Id);

            //db.Tickets.Add(ticket);
            //db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
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