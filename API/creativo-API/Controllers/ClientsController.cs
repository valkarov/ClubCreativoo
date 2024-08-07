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
    public class ClientsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Clients
        public IQueryable<Client> GetClients()
        {
            return db.Clients;
        }

        // GET: api/Clients/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClient(int id)
        {
            Client client = db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        // GET: api/Clients/byId/5
        [HttpGet]
        [Route("api/Clients/byId/{id}")]
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClientById(int id)
        {
            
            if (!IdExists(id))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // GET: api/Clients/byUser/5
        [HttpGet]
        [Route("api/Clients/byUser/{user}")]
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClientByUser(string user)
        {
            if (!UserExists(user))
            {
                return BadRequest("No Encontrado");
            }

            return Ok();
        }

        // GET: api/Clients/byEmail/5
        [HttpGet]
        [Route("api/Clients/byEmail/{email}")]
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClientByEmail(string email)
        {
            
            if (!EmailExistsPointless(email))
            {
                return BadRequest("No Encontrado");
            }


            return Ok();
        }





        // PUT: api/Clients/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClient(int id, Client client)
        {
            if (AnyAttributeEmpty(client))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (IdExists(client.IdClient))
            {
                return BadRequest("Número de cédula en uso");
            }

            if (UserExists(client.Username))
            {
                return BadRequest("Nombre de Usuario en uso");
            }

            if (!EsCorreoValido(client.Email))
            {
                return BadRequest("Correo no válido");
            }
            if (EmailExists(client.Email))
            {
                return BadRequest("Correo en Uso");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client.IdClient)
            {
                return BadRequest();
            }

            db.Entry(client).State = EntityState.Modified;

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

        // POST: api/Clients
        [ResponseType(typeof(Client))]
        public IHttpActionResult PostClient(Client client)
        {

            if (AnyAttributeEmpty(client))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (IdExists(client.IdClient))
            {
                return BadRequest("Número de cédula en uso");
            }

            if (UserExists(client.Username))
            {
                return BadRequest("Nombre de Usuario en uso");
            }

            if (!EsCorreoValido(client.Email))
            {
                return BadRequest("Correo no válido");
            }
            if (EmailExists(client.Email))
            {
                return BadRequest("Correo en Uso");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Clients.Add(client);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = client.IdClient }, client);
        }
        private bool AnyAttributeEmpty(Client client)
        {
            // Verificar cada propiedad del objeto Client
            // Devolver true si alguna propiedad es una cadena vacía, de lo contrario, devolver false
            return string.IsNullOrEmpty(client.Username) ||
                   string.IsNullOrEmpty(client.Password) ||
                   string.IsNullOrEmpty(client.FirstName) ||
                   string.IsNullOrEmpty(client.LastName) ||
                   string.IsNullOrEmpty(client.Phone) ||
                   string.IsNullOrEmpty(client.Province) ||
                   string.IsNullOrEmpty(client.Canton) ||
                   string.IsNullOrEmpty(client.District);
        }


        // DELETE: api/Clients/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult DeleteClient(int id)
        {
            Client client = db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            db.Clients.Remove(client);
            db.SaveChanges();

            return Ok(client);
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
    }
}