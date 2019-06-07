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
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Lines")]
    public class LinesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork _unitOfWork;

        public LinesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Lines
        [Route("GetAll")]
        public IEnumerable<Line> GetLines()
        {
            //return db.Lines;
            var v = _unitOfWork.Lines.CompleteLine();
            //var v = _unitOfWork.Lines.
            return v;
        }

        // GET: api/Lines/5
        //[ResponseType(typeof(Line))]
        //public IHttpActionResult GetLine(int id)
        //{
        //    Line line = db.Lines.Find(id);
        //    if (line == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(line);
        //}

        // PUT: api/Lines/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutLine(int id, Line line)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != line.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(line).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!LineExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        [Route("Add")]
        // POST: api/Lines
        [ResponseType(typeof(Line))]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Line newLine = new Line();
            newLine.ListOfStations = new List<Station>();
            newLine.RegularNumber = line.RegularNumber;
            newLine.Id = line.Id;

            newLine.ListOfStations = new List<Station>();


            List<Station> listModel = new List<Station>();
            listModel = line.ListOfStations;

            List<Line> linesFromDb = new List<Line>();
            linesFromDb = _unitOfWork.Lines.GetAll().ToList();


            var v = _unitOfWork.Lines.CompleteLine();

            bool pom = true;

            foreach (var item in v)
            {
                if(item.ListOfStations.Count == listModel.Count)
                {
                    if (CanAddLine(item.ListOfStations, listModel))
                    {
                        pom = false;    //ne smije je dodati
                        break;
                    }
                }
                
            }

            if(!pom)
            {
                return BadRequest(ModelState);
            }

            List<Station> list = new List<Station>();
            list = _unitOfWork.Stations.GetAll().ToList();

            foreach (var item in list)
            {
                if (listModel.Any(a=> a.Id == item.Id))
                {
                         
                    newLine.ListOfStations.Add(item);
                }
            }
            

            _unitOfWork.Lines.Add(newLine);
            _unitOfWork.Complete();

            return Ok(newLine.Id);

            //db.Lines.Add(line);
            //db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

        public bool CanAddLine(List<Station> l1, List<Station> l2)
        {
            foreach (var item in l2)
            {
                if(!l1.Any(p=> p.Name == item.Name))
                {
                    return false;
                }
            }
            return true;

            //return l1.All(l2.Contains);
        }

        [Route("Delete")]
        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            // = db.Lines.Find(id);

            Line line = _unitOfWork.Lines.Get(id);

            if (line == null)
            {
                return NotFound();
            }

            _unitOfWork.Lines.Remove(line);
            _unitOfWork.Complete();

            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool LineExists(int id)
        //{
        //    return db.Lines.Count(e => e.Id == id) > 0;
        //}
    }
}