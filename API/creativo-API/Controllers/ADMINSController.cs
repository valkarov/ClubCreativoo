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
    public class AdminsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Admins
        public IQueryable<Admin> GetAdmins()
        {
            return db.Admins;
        }

        // GET: api/Admins/5
        [ResponseType(typeof(Admin))]
        public IHttpActionResult GetAdmin(int id)
        {
            Admin admin = db.Admins.Find(id);
            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        // GET: api/Admins/byId/5
        [HttpGet]
        [Route("api/Admins/byId/{id}")]
        [ResponseType(typeof(Admin))]
        public IHttpActionResult GetAdminById(int id)
        {
            if (!IdExists(id))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // GET: api/Admins/byUser/5
        [HttpGet]
        [Route("api/Admins/byUser/{user}")]
        [ResponseType(typeof(Admin))]
        public IHttpActionResult GetAdminByUser(string user)
        {
            if (!UserExists(user))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // PUT: api/Admins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAdmin(int id, Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != admin.IdAdmin)
            {
                return BadRequest();
            }

            db.Entry(admin).State = EntityState.Modified;

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

        // POST: api/Admins
        [ResponseType(typeof(Admin))]
        public IHttpActionResult PostAdmin(Admin admin)
        {
            if (AnyAttributeEmpty(admin))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (IdExists(admin.IdAdmin))
            {
                return BadRequest("Número de cédula en uso");
            }

            if (UserExists(admin.Username))
            {
                return BadRequest("Nombre de Usuario en uso");
            }



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Admins.Add(admin);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IdExists(admin.IdAdmin))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = admin.IdAdmin }, admin);
        }

        private bool AnyAttributeEmpty(Admin admin)
        {
            return string.IsNullOrEmpty(admin.Username) ||
                   string.IsNullOrEmpty(admin.Password) ||
                   string.IsNullOrEmpty(admin.FirstName) ||
                   string.IsNullOrEmpty(admin.LastName);
        }

        // DELETE: api/Admins/5
        [ResponseType(typeof(Admin))]
        public IHttpActionResult DeleteAdmin(int id)
        {
            Admin admin = db.Admins.Find(id);
            if (admin == null)
            {
                return NotFound();
            }

            db.Admins.Remove(admin);
            db.SaveChanges();

            return Ok(admin);
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
    }
}