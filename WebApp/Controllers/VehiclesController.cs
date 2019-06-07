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
    [RoutePrefix("api/Vehicles")]
    public class VehiclesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Vehicles
        public IQueryable<Vehicle> GetVehicles()
        {
            return _unitOfWork.Vehicles.GetAll().AsQueryable();
        }

        // GET: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = _unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [ResponseType(typeof(void))]
        //public IHttpActionResult PutVehicle(int id, Vehicle vehicle)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != vehicle.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(vehicle).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VehicleExists(id))
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
        // POST: api/Vehicles
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IEnumerable<Line> lines = new List<Line>();
            lines = _unitOfWork.Lines.CompleteLine();

            


            _unitOfWork.Vehicles.Add(vehicle);
            _unitOfWork.Complete();

            return Ok(vehicle.Id);
            //return CreatedAtRoute("DefaultApi", new { id = vehicle.Id }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = _unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _unitOfWork.Vehicles.Remove(vehicle);
            _unitOfWork.Complete();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool VehicleExists(int id)
        //{
        //    return db.Vehicles.Count(e => e.Id == id) > 0;
        //}
    }
}