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
    public class Social_TypeController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Social_Type
        public IQueryable<Social_Type> GetSocial_Type()
        {
            return db.Social_Type;
        }

        // GET: api/Social_Type/5
        [ResponseType(typeof(Social_Type))]
        public IHttpActionResult GetSocial_Type(string id)
        {
            Social_Type social_Type = db.Social_Type.Find(id);
            if (social_Type == null)
            {
                return NotFound();
            }

            return Ok(social_Type);
        }

        // PUT: api/Social_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSocial_Type(string id, Social_Type social_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != social_Type.type)
            {
                return BadRequest();
            }

            db.Entry(social_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Social_TypeExists(id))
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

        // POST: api/Social_Type
        [ResponseType(typeof(Social_Type))]
        public IHttpActionResult PostSocial_Type(Social_Type social_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Social_Type.Add(social_Type);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Social_TypeExists(social_Type.type))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = social_Type.type }, social_Type);
        }

        // DELETE: api/Social_Type/5
        [ResponseType(typeof(Social_Type))]
        public IHttpActionResult DeleteSocial_Type(string id)
        {
            Social_Type social_Type = db.Social_Type.Find(id);
            if (social_Type == null)
            {
                return NotFound();
            }

            db.Social_Type.Remove(social_Type);
            db.SaveChanges();

            return Ok(social_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Social_TypeExists(string id)
        {
            return db.Social_Type.Count(e => e.type == id) > 0;
        }
    }
}