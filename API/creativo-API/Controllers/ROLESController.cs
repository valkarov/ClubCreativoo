using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
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
    public class RolesController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Roles
        public IQueryable<Role> GetRoles()
        {
            return db.Roles;
        }


        // GET: api/Roles/Usuario/Pass
        [ResponseType(typeof(Role))]
        [Route("api/Roles/{usuario}/{pass}")]
        public IHttpActionResult GetROL(string usuario, string pass)
        {

            if (string.IsNullOrEmpty(usuario) || string.IsNullOrEmpty(pass))
            {
                return BadRequest("Usuario y contraseña son requeridos");
            }

            Role rol = db.Roles.FirstOrDefault(r => r.Username == usuario);

            if (rol == null)
            {
                return BadRequest("Usuario o Contraseña Incorrectas");
            }


            if (db.Admins.FirstOrDefault(obj => obj.Username == usuario && obj.Password == pass) != null)
            {
                return Ok(rol);

            };

            //if (db.Entrepreneurships.FirstOrDefault(obj => obj.Username == usuario && obj.Password == pass) != null)
            //{
            //    return Ok(rol);

            //};


            if (db.Clients.FirstOrDefault(obj => obj.Username == usuario && obj.Password == pass) != null)
            {
                return Ok(rol);

            };
            if (db.Delivery_Persons.FirstOrDefault(obj => obj.Username == usuario && obj.Password == pass) != null)
            {
                return Ok(rol);

            };

            return BadRequest("Usuario o Contraseña Incorrectas");
        }

        // GET: api/Roles/Google/Usuario/
        [ResponseType(typeof(Role))]
        [Route("api/Roles/Google/{usuario}")]
        public IHttpActionResult GetROLGoogle(string usuario)
        {

            if (string.IsNullOrEmpty(usuario))
            {
                return BadRequest("Usuario y contraseña son requeridos");
            }

            Role rol = db.Roles.FirstOrDefault(r => r.Username == usuario);

            if (rol == null)
            {
                return BadRequest("Usuario o Contraseña Incorrectas");
            }


            if (db.Admins.FirstOrDefault(obj => obj.Username == usuario) != null)
            {
                return Ok(rol);

            };


            if (db.Clients.FirstOrDefault(obj => obj.Username == usuario) != null)
            {
                return Ok(rol);

            };
            if (db.Delivery_Persons.FirstOrDefault(obj => obj.Username == usuario) != null)
            {
                return Ok(rol);

            };

            return BadRequest("Usuario No Registrado");
        }

        // GET: api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole(string id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRole(string id, Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != role.Username)
            {
                return BadRequest();
            }

            db.Entry(role).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/Roles
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Roles.Add(role);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RoleExists(role.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = role.Username }, role);
        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(string id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            db.Roles.Remove(role);
            db.SaveChanges();

            return Ok(role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(string id)
        {
            return db.Roles.Count(e => e.Username == id) > 0;
        }
    }
}