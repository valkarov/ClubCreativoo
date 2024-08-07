using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using creativo_API.Models;

namespace creativo_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SocialsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Socials
        public IQueryable<Social> GetSocials()
        {
            return db.Socials;
        }


        // GET: api/Socials/byUser/5
        [HttpGet]
        [Route("api/Socials/byUser/{user}")]
        [ResponseType(typeof(Social))]
        public IQueryable<Social> GetSocialsByUser(string user)
        {
            return db.Socials.Where(e => e.Username == user);
        }


        // GET: api/Socials/correo/5
        [HttpGet]
        [Route("api/Socials/correo/{user}")]
        [ResponseType(typeof(Social))]
        public IQueryable<Social> Enviar(string user)
        {
            correo();
            return db.Socials.Where(e => e.Username == user);
        }
        static void correo()
        {
                // Configuración del servidor SMTP de Gmail
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Puerto SMTP de Gmail
                    Credentials = new NetworkCredential("clubcreativo95@gmail.com", "rhslulyagacuxvbe"),
                    EnableSsl = true, // Habilitar SSL
                };

                // Configuración del mensaje de correo
                MailMessage mail = new MailMessage
                {
                    From = new MailAddress("clubcreativo95@gmail.com"),
                    Subject = "Asunto del correo",
                    Body = "Cuerpo del mensaje del correo",
                    IsBodyHtml = true, // Si el cuerpo del correo es HTML
                };
                mail.To.Add("andyfrasiel@gmail.com");

                // Enviar el correo
                smtpClient.Send(mail);
                Console.WriteLine("Correo enviado exitosamente.");
            
            
        }


// GET: api/Socials/5
[ResponseType(typeof(Social))]
        public IHttpActionResult GetSocial(string id)
        {
            Social social = db.Socials.Find(id);
            if (social == null)
            {
                return NotFound();
            }

            return Ok(social);
        }

        // PUT: api/Socials/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSocial(string id, Social social)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != social.Username)
            {
                return BadRequest();
            }

            db.Entry(social).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialExists(id))
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

        // POST: api/Socials
        [ResponseType(typeof(Social))]
        public IHttpActionResult PostSocial(Social social)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Socials.Add(social);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SocialExists(social.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = social.Username }, social);
        }

        // DELETE: api/Socials/5
        [ResponseType(typeof(Social))]
        public IHttpActionResult DeleteSocial(string id)
        {
            Social social = db.Socials.Find(id);
            if (social == null)
            {
                return NotFound();
            }

            db.Socials.Remove(social);
            db.SaveChanges();

            return Ok(social);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SocialExists(string id)
        {
            return db.Socials.Count(e => e.Username == id) > 0;
        }
    }
}