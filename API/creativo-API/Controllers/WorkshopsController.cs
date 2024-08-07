using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using creativo_API.Models;

namespace creativo_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WorkshopsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Workshops
        public IQueryable<Workshop> GetWorkshops()
        {
            return db.Workshops;
        }

        // GET: api/Workshops/5
        [ResponseType(typeof(Workshop))]
        public IHttpActionResult GetWorkshop(int id)
        {
            Workshop workshop = db.Workshops.Find(id);
            if (workshop == null)
            {
                return NotFound();
            }

            return Ok(workshop);
        }
        // GET: api/Workshops/byEntre/{entre_user}
        [HttpGet]
        [Route("api/Workshops/byEntre/{entre_user}")]
        public IQueryable<Workshop> GetWorkshop_by_entre(string entre_user)
        {

            return db.Workshops.Where(e => e.IdEntrepreneurship == entre_user);
        }

        // PUT: api/Workshops/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutWorkshop(int id, Workshop workshop)
        {
            if (AnyAttributeEmpty(workshop))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (workshop.Description?.Length > 250)
            {
                return BadRequest("La descripción ha superado los 250 Caracteres");
            }

            if (workshop.Link?.Length > 250)
            {
                return BadRequest("El link ha superado los 250 Caracteres");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != workshop.IdWorkshop)
            {
                return BadRequest();
            }

            db.Entry(workshop).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkshopExists(id))
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

        // POST: api/Workshops
        [ResponseType(typeof(Workshop))]
        public IHttpActionResult PostWorkshop(Workshop workshop)
        {
            if (AnyAttributeEmpty(workshop))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (workshop.Description?.Length > 250)
            {
                return BadRequest("La descripción ha superado los 250 Caracteres");
            }

            if (workshop.Link?.Length > 250)
            {
                return BadRequest("El link ha superado los 250 Caracteres");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Workshops.Add(workshop);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = workshop.IdWorkshop }, workshop);
        }

        // DELETE: api/Workshops/5
        [ResponseType(typeof(Workshop))]
        public IHttpActionResult DeleteWorkshop(int id)
        {
            Workshop workshop = db.Workshops.Find(id);
            if (workshop == null)
            {
                return NotFound();
            }

            db.Workshops.Remove(workshop);
            db.SaveChanges();

            return Ok(workshop);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WorkshopExists(int id)
        {
            return db.Workshops.Count(e => e.IdWorkshop == id) > 0;
        }

        private bool AnyAttributeEmpty(Workshop workshop)
        {
            return string.IsNullOrEmpty(workshop.IdEntrepreneurship) ||
                   workshop.IdWorkshop == 0 ||
                   string.IsNullOrEmpty(workshop.Name) ||
                   workshop.Price == null ||
                   string.IsNullOrEmpty(workshop.Description) ||
                   string.IsNullOrEmpty(workshop.Link) ||
                   string.IsNullOrEmpty(workshop.Type);
        }
    }
}