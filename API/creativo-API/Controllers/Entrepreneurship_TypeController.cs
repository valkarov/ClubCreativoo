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
    public class Entrepreneurship_TypeController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Entrepreneurship_Type
        public IQueryable<Entrepreneurship_Type> GetEntrepreneurship_Type()
        {
            return db.Entrepreneurship_Type
              .OrderBy(et => et.type == "Otros" ? 1 : 0)
              .ThenBy(et => et.type);
        }

        // GET: api/Entrepreneurship_Type/5
        [ResponseType(typeof(Entrepreneurship_Type))]
        public IHttpActionResult GetEntrepreneurship_Type(string id)
        {
            Entrepreneurship_Type entrepreneurship_Type = db.Entrepreneurship_Type.Find(id);
            if (entrepreneurship_Type == null)
            {
                return NotFound();
            }

            return Ok(entrepreneurship_Type);
        }

        // PUT: api/Entrepreneurship_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEntrepreneurship_Type(string id, Entrepreneurship_Type entrepreneurship_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entrepreneurship_Type.type)
            {
                return BadRequest();
            }

            db.Entry(entrepreneurship_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Entrepreneurship_TypeExists(id))
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

        // POST: api/Entrepreneurship_Type
        [ResponseType(typeof(Entrepreneurship_Type))]
        public IHttpActionResult PostEntrepreneurship_Type(Entrepreneurship_Type entrepreneurship_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entrepreneurship_Type.Add(entrepreneurship_Type);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Entrepreneurship_TypeExists(entrepreneurship_Type.type))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = entrepreneurship_Type.type }, entrepreneurship_Type);
        }

        // DELETE: api/Entrepreneurship_Type/5
        [ResponseType(typeof(Entrepreneurship_Type))]
        public IHttpActionResult DeleteEntrepreneurship_Type(string id)
        {
            Entrepreneurship_Type entrepreneurship_Type = db.Entrepreneurship_Type.Find(id);
            if (entrepreneurship_Type == null)
            {
                return NotFound();
            }

            db.Entrepreneurship_Type.Remove(entrepreneurship_Type);
            db.SaveChanges();

            return Ok(entrepreneurship_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Entrepreneurship_TypeExists(string id)
        {
            return db.Entrepreneurship_Type.Count(e => e.type == id) > 0;
        }
    }
}