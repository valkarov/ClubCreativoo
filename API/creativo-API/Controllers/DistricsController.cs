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
    public class DistricsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Districs
        public IQueryable<Distric> GetDistrics()
        {
            return db.Districs;
        }
        // GET: api/Districs/Canton
        [HttpGet]
        [Route("api/Districs/{canton}")]
        public IQueryable<Distric> GetCantones(string canton)
        {
            return db.Districs.Where(e => e.Canton == canton);
        }


        // GET: api/Districs/5
        [ResponseType(typeof(Distric))]
        public IHttpActionResult GetDistric(string id)
        {
            Distric distric = db.Districs.Find(id);
            if (distric == null)
            {
                return NotFound();
            }

            return Ok(distric);
        }

        // PUT: api/Districs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDistric(string id, Distric distric)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != distric.Name)
            {
                return BadRequest();
            }

            db.Entry(distric).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DistricExists(id))
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

        // POST: api/Districs
        [ResponseType(typeof(Distric))]
        public IHttpActionResult PostDistric(Distric distric)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Districs.Add(distric);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DistricExists(distric.Name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = distric.Name }, distric);
        }

        // DELETE: api/Districs/5
        [ResponseType(typeof(Distric))]
        public IHttpActionResult DeleteDistric(string id)
        {
            Distric distric = db.Districs.Find(id);
            if (distric == null)
            {
                return NotFound();
            }

            db.Districs.Remove(distric);
            db.SaveChanges();

            return Ok(distric);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DistricExists(string id)
        {
            return db.Districs.Count(e => e.Name == id) > 0;
        }
    }
}