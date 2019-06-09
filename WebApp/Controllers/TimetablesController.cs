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
    [RoutePrefix("api/Timetable")]
    public class TimetablesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        IUnitOfWork _unitOfWork;

        public TimetablesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Timetables
        public IQueryable<Timetable> GetTimetables()
        {
            return _unitOfWork.Timetables.GetAll().AsQueryable();
        }

        // GET: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult GetTimetable(int id)
        {
            Timetable timetable = db.Timetables.Find(id);
            if (timetable == null)
            {
                return NotFound();
            }

            return Ok(timetable);
        }

        // PUT: api/Timetables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTimetable(int id, Timetable timetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timetable.Id)
            {
                return BadRequest();
            }

            db.Entry(timetable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetableExists(id))
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
        // POST: api/Timetables
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult PostTimetable(TimetablePomModel timetablePom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Timetable> listTimetableFromDb = _unitOfWork.Timetables.GetAll().ToList();

            Timetable newTimetable = new Timetable();

            int dayIdd = 0;
            List<Day> d = _unitOfWork.Days.GetAll().ToList();
            foreach (var item in d)
            {
                if (item.Name == timetablePom.DayId)
                {
                    dayIdd = item.Id;
                    break;
                }
            }

            int lineIdd = 0;
            List<Line> l = _unitOfWork.Lines.GetAll().ToList();

            foreach (var item in l)
            {
                if (item.RegularNumber == timetablePom.LineId)
                {
                    lineIdd = item.Id;
                    break;
                }
            }

            bool existsTimetable = false;

            foreach (var item in listTimetableFromDb)
            {
                if(item.LineId == lineIdd && item.DayId == dayIdd)
                {
                    existsTimetable = true; //ne smije upisati vec postoji
                    break;
                }
            }

            

            newTimetable.LineId = lineIdd;
            newTimetable.DayId = dayIdd;
            newTimetable.Departures = timetablePom.Departures;

            if (!existsTimetable)
            {
                newTimetable.Departures += ":00|";
                _unitOfWork.Timetables.Add(newTimetable);
                _unitOfWork.Complete();
                return Ok(newTimetable.Id);
            }
            else
            {
                Timetable timetable2 = new Timetable();
                foreach (var item in listTimetableFromDb)
                {
                    if(item.LineId == newTimetable.LineId && item.DayId == newTimetable.DayId)
                    {
                        timetable2 = item;
                    }
                }
                
                timetable2.Departures += newTimetable.Departures + "|";

                string vremena = timetable2.Departures;

                List<TimeSpan> listTimeSpan = new List<TimeSpan>();

                string[] nizVremena = vremena.Split('|');
                for (int i = 0; i < nizVremena.Length-1; i++)
                {
                    listTimeSpan.Add(TimeSpan.Parse(nizVremena[i]));
                }

                List<TimeSpan> sortiranaVremena = listTimeSpan.OrderBy(dd => dd.Hours).ThenBy(dddd => dddd.Minutes).ToList();

                string noviString = "";
                foreach (var item in sortiranaVremena)
                {
                    noviString += item.ToString() + "|";
                }

                timetable2.Departures = noviString;
                _unitOfWork.Timetables.Update(timetable2);
                _unitOfWork.Complete();

                return Ok();

            }


            
            //newTimetable.LineId = timetablePom.LineId;
           
            //newTimetable.DayId = _unitOfWork.Days.GetAll 

            //string time = timetablePom.Departures.ToString();

            ////db.Timetables.Add(timetable);
            ////db.SaveChanges();

            //return Ok();
            //return CreatedAtRoute("DefaultApi", new { id = timetable.Id }, timetable);
        }

        // DELETE: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult DeleteTimetable(int id)
        {
            Timetable timetable = db.Timetables.Find(id);
            if (timetable == null)
            {
                return NotFound();
            }

            db.Timetables.Remove(timetable);
            db.SaveChanges();

            return Ok(timetable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TimetableExists(int id)
        {
            return db.Timetables.Count(e => e.Id == id) > 0;
        }
    }
}