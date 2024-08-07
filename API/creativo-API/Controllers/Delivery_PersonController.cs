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
    public class Delivery_PersonController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Delivery_Person
        public IQueryable<Delivery_Person> GetDelivery_Persons()
        {
            return db.Delivery_Persons;
        }

        // GET: api/Delivery_Person/5
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult GetDelivery_Person(int id)
        {
            Delivery_Person delivery_Person = db.Delivery_Persons.Find(id);
            if (delivery_Person == null)
            {
                return NotFound();
            }

            return Ok(delivery_Person);
        }

        // GET: api/Delivery_Person/byId/5
        [HttpGet]
        [Route("api/Delivery_Person/byId/{id}")]
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult GetDelivery_PersonById(int id)
        {
            if (!IdExists(id))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }


        // GET: api/Delivery_Person/byUser/5
        [HttpGet]
        [Route("api/Delivery_Person/byUser/{user}")]
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult GetDelivery_PersoByUser(string user)
        {
            if (!UserExists(user))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // GET: api/Delivery_Person/byEmail/5
        [HttpGet]
        [Route("api/Delivery_Person/byEmail/{email}")]
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult GetDelivery_PersonByEmail(string email)
        {
            if (!EmailExistsPointless(email))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }


        // PUT: api/Delivery_Person/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDelivery_Person(int id, Delivery_Person delivery_Person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != delivery_Person.IdDeliveryPerson)
            {
                return BadRequest();
            }

            db.Entry(delivery_Person).State = EntityState.Modified;

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

        // POST: api/Delivery_Person
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult PostDelivery_Person(Delivery_Person delivery_Person)
        {

            if (AnyAttributeEmpty(delivery_Person))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (IdExists(delivery_Person.IdDeliveryPerson))
            {
                return BadRequest("Número de cédula en uso");
            }

            if (UserExists(delivery_Person.Username))
            {
                return BadRequest("Nombre de Usuario en uso");
            }
            if (!EsCorreoValido(delivery_Person.Email))
            {
                return BadRequest("Correo no válido");
            }
            if (EmailExists(delivery_Person.Email))
            {
                return BadRequest("Correo en Uso");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Delivery_Persons.Add(delivery_Person);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IdExists(delivery_Person.IdDeliveryPerson))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = delivery_Person.IdDeliveryPerson }, delivery_Person);
        }

        // DELETE: api/Delivery_Person/5
        [ResponseType(typeof(Delivery_Person))]
        public IHttpActionResult DeleteDelivery_Person(int id)
        {
            Delivery_Person delivery_Person = db.Delivery_Persons.Find(id);
            if (delivery_Person == null)
            {
                return NotFound();
            }

            db.Delivery_Persons.Remove(delivery_Person);
            db.SaveChanges();

            return Ok(delivery_Person);
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
        private bool AnyAttributeEmpty(Delivery_Person deliveryPerson)
        {
            // Verificar cada propiedad del objeto DeliveryPerson
            // Devolver true si alguna propiedad es una cadena vacía, de lo contrario, devolver false
            return string.IsNullOrEmpty(deliveryPerson.Username) ||
                   string.IsNullOrEmpty(deliveryPerson.Password) ||
                   string.IsNullOrEmpty(deliveryPerson.Firstname) ||
                   string.IsNullOrEmpty(deliveryPerson.Lastname) ||
                   string.IsNullOrEmpty(deliveryPerson.State) ||
                   string.IsNullOrEmpty(deliveryPerson.Province) ||
                   string.IsNullOrEmpty(deliveryPerson.Canton) ||
                   string.IsNullOrEmpty(deliveryPerson.District) ||
                   string.IsNullOrEmpty(deliveryPerson.Phone);
        }

    }
}