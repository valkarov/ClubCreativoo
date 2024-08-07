using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using creativo_API.Models;

namespace creativo_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EntrepreneurshipsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Entrepreneurships
        public IQueryable<Entrepreneurship> GetEntrepreneurships()
        {
            return db.Entrepreneurships;
        }


        // GET: api/Entrepreneurships/Solicitudes
        [HttpGet]
        [Route("api/Entrepreneurships/Solicitudes")]
        public IQueryable<Entrepreneurship> GetSolicitudes()
        {
            return db.Entrepreneurships.Where(e => e.State == "Pendiente");
        }

        // GET: api/Entrepreneurships/5
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult GetEntrepreneurship(int id)
        {
            Entrepreneurship entrepreneurship = db.Entrepreneurships.Find(id);
            if (entrepreneurship == null)
            {
                return NotFound();
            }

            return Ok(entrepreneurship);
        }

        // GET: api/Entrepreneurships/byId/5
        [HttpGet]
        [Route("api/Entrepreneurships/byId/{id}")]
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult GetEntrepreneurshipById(int id)
        {
            if (!IdExists(id))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }
        // GET: api/Entrepreneurships/byUser/5
        [HttpGet]
        [Route("api/Entrepreneurships/byUser/{user}")]
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult GetEntrepreneurshipByUser(string user)
        {
            if (!UserExists(user))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // GET: api/Entrepreneurships/byEmail/5
        [HttpGet]
        [Route("api/Entrepreneurships/byEmail/{email}")]
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult GetEntrepreneurshipByEmail(string email)
        {
            if (!EmailExistsPointless(email))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // PUT: api/Entrepreneurships/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEntrepreneurship(int id, Entrepreneurship entrepreneurship)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entrepreneurship.IdEntrepreneurship)
            {
                return BadRequest();
            }

            db.Entry(entrepreneurship).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdExists(id))
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

        // POST: api/Entrepreneurships
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult PostEntrepreneurship(Entrepreneurship entrepreneurship)
        {

            if (AnyAttributeEmpty(entrepreneurship))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (IdExists(entrepreneurship.IdEntrepreneurship))
            {
                return BadRequest("Número de cédula en uso");
            }
            if (UserExists(entrepreneurship.Username))
            {
                return BadRequest("Username en uso");
            }

            if (!EsCorreoValido(entrepreneurship.Email))
            {
                return BadRequest("Correo no válido");
            }

            if (EmailExists(entrepreneurship.Email))
            {
                return BadRequest("Correo en Uso");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entrepreneurships.Add(entrepreneurship);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IdExists(entrepreneurship.IdEntrepreneurship))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = entrepreneurship.IdEntrepreneurship }, entrepreneurship);
        }

        // DELETE: api/Entrepreneurships/5
        [ResponseType(typeof(Entrepreneurship))]
        public IHttpActionResult DeleteEntrepreneurship(int id)
        {
            Entrepreneurship entrepreneurship = db.Entrepreneurships.Find(id);
            if (entrepreneurship == null)
            {
                return NotFound();
            }

            db.Entrepreneurships.Remove(entrepreneurship);
            db.SaveChanges();

            return Ok(entrepreneurship);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IdExists(int id)
        {
            return db.Admins.Count(e => e.IdAdmin == id) > 0 ||
                db.Clients.Count(e => e.IdClient == id) > 0 ||
                db.Entrepreneurships.Count(e => e.IdEntrepreneurship == id) > 0 ||
                db.Delivery_Persons.Count(e => e.IdDeliveryPerson == id) > 0;
        }
        private bool UserExists(string user)
        {
            return db.Admins.Count(e => e.Username == user) > 0 ||
               db.Clients.Count(e => e.Username == user) > 0 ||
               db.Entrepreneurships.Count(e => e.Username == user) > 0 ||
               db.Delivery_Persons.Count(e => e.Username == user) > 0;

        }

        static bool EsCorreoValido(string correo)
        {
            string patron = @"^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$";
            return Regex.IsMatch(correo, patron);
        }


        private bool EmailExists(string email)
        {
            return
               db.Clients.Count(e => e.Email == email) > 0 ||
               db.Entrepreneurships.Count(e => e.Email == email) > 0 ||
               db.Delivery_Persons.Count(e => e.Email == email) > 0;

        }

        private bool EmailExistsPointless(string email)
        {
            return
               db.Clients.Count(e => e.Email.Replace(".", "") == email) > 0 ||
               db.Entrepreneurships.Count(e => e.Email.Replace(".", "") == email) > 0 ||
               db.Delivery_Persons.Count(e => e.Email.Replace(".", "") == email) > 0;

        }

        private bool AnyAttributeEmpty(Entrepreneurship entrepreneurship)
        {
            // Verificar cada propiedad del objeto Entrepreneurship
            // Devolver true si alguna propiedad es una cadena vacía, de lo contrario, devolver false
            return string.IsNullOrEmpty(entrepreneurship.Username) ||
                   string.IsNullOrEmpty(entrepreneurship.Type) ||
                   string.IsNullOrEmpty(entrepreneurship.Name) ||
                   string.IsNullOrEmpty(entrepreneurship.Email) ||
                   string.IsNullOrEmpty(entrepreneurship.Sinpe) ||
                   string.IsNullOrEmpty(entrepreneurship.Phone) ||
                   string.IsNullOrEmpty(entrepreneurship.Province) ||
                   string.IsNullOrEmpty(entrepreneurship.Canton) ||
                   string.IsNullOrEmpty(entrepreneurship.District) ||
                   string.IsNullOrEmpty(entrepreneurship.State);
        }

    }
}