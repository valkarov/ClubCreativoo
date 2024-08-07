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
using System.Web.UI.WebControls;
using creativo_API.Models;

namespace creativo_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Entrepreneurship_AdminsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Entrepreneurship_Admins
        public IQueryable<Entrepreneurship_Admins> GetEntrepreneurship_Admins()
        {
            return db.Entrepreneurship_Admins;
        }

        // GET: api/Entrepreneurship_Admins/byClient/{client_user}
        [HttpGet]
        [Route("api/Entrepreneurship_Admins/byClient/{client_user}")]
        public IQueryable<Entrepreneurship_Admins> GetEntrepreneurship_by_client(string client_user)
        {

            return db.Entrepreneurship_Admins
                .Where(e => e.IdClient == client_user && (e.state == "Aceptado" || e.state == "Pendiente"))
                .OrderBy(c => c.state == "Pendiente" ? 0 : 1);
        }


        // GET: api/Entrepreneurship_Admins/byClient/{client_user}
        [HttpGet]
        [Route("api/Entrepreneurship_Admins/byEntre/{entre_user}")]
        public IQueryable<Entrepreneurship_Admins> GetEntrepreneurship_by_entre(string entre_user)
        {

            return db.Entrepreneurship_Admins
                .Where(e => e.IdEntrepreneurship == entre_user)
                .OrderBy(c => c.state == "Aceptado" ? 0 : (c.state == "Pendiente" ? 1 : 2))
                .ThenBy(c => c.state);
        }

        // GET: api/Entrepreneurship_Admins/5
        [ResponseType(typeof(Entrepreneurship_Admins))]
        public IHttpActionResult GetEntrepreneurship_Admins(string id)
        {
            Entrepreneurship_Admins entrepreneurship_Admins = db.Entrepreneurship_Admins.Find(id);
            if (entrepreneurship_Admins == null)
            {
                return NotFound();
            }

            return Ok(entrepreneurship_Admins);
        }

        // PUT: api/Entrepreneurship_Admins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEntrepreneurship_Admins(string id, Entrepreneurship_Admins entrepreneurship_Admins)
        {



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entrepreneurship_Admins.IdEntrepreneurship)
            {
                return BadRequest();
            }

            db.Entry(entrepreneurship_Admins).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Entrepreneurship_AdminsExists(id))
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

        // POST: api/Entrepreneurship_Admins
        [ResponseType(typeof(Entrepreneurship_Admins))]
        public IHttpActionResult PostEntrepreneurship_Admins(Entrepreneurship_Admins entrepreneurship_Admins)
        {


            if (string.IsNullOrEmpty(entrepreneurship_Admins.IdEntrepreneurship) || string.IsNullOrEmpty(entrepreneurship_Admins.IdClient))
            {
                return BadRequest("El usuario está vacio");
            }

            if (db.Clients.Count(e => e.Username == entrepreneurship_Admins.IdClient) == 0 )
            {
                return BadRequest("Usuario no exite");
            }

            if (db.Entrepreneurships.Count(e => e.Username == entrepreneurship_Admins.IdEntrepreneurship) == 0)
            {
                return BadRequest("Emprendimiento no exite");
            }

            if (db.Entrepreneurship_Admins.Count(e => e.IdEntrepreneurship == entrepreneurship_Admins.IdEntrepreneurship && e.IdClient == entrepreneurship_Admins.IdClient) >0 )
            {
                return BadRequest("el usuario ya es administrador");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entrepreneurship_Admins.Add(entrepreneurship_Admins);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Entrepreneurship_AdminsExists(entrepreneurship_Admins.IdEntrepreneurship))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = entrepreneurship_Admins.IdEntrepreneurship }, entrepreneurship_Admins);
        }

        // DELETE: api/Entrepreneurship_Admins/5
        [ResponseType(typeof(Entrepreneurship_Admins))]
        public IHttpActionResult DeleteEntrepreneurship_Admins(string id)
        {
            Entrepreneurship_Admins entrepreneurship_Admins = db.Entrepreneurship_Admins.Find(id);
            if (entrepreneurship_Admins == null)
            {
                return NotFound();
            }

            db.Entrepreneurship_Admins.Remove(entrepreneurship_Admins);
            db.SaveChanges();

            return Ok(entrepreneurship_Admins);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Entrepreneurship_AdminsExists(string id)
        {
            return db.Entrepreneurship_Admins.Count(e => e.IdEntrepreneurship == id) > 0;
        }
    }
}