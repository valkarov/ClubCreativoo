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
    public class Temp_PassController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Temp_Pass
        public IQueryable<Temp_Pass> GetTemp_Pass()
        {
            return db.Temp_Pass;
        }

        // GET: api/Temp_Pass/5
        [ResponseType(typeof(Temp_Pass))]
        public IHttpActionResult GetTemp_Pass(string id)
        {
            Temp_Pass temp_Pass = db.Temp_Pass.Find(id);
            if (temp_Pass == null)
            {
                return NotFound();
            }

            return Ok(temp_Pass);
        }

        // PUT: api/Temp_Pass/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTemp_Pass(string id, Temp_Pass temp_Pass)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != temp_Pass.Username)
            {
                return BadRequest();
            }

            db.Entry(temp_Pass).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Temp_PassExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            ChangePassword(temp_Pass);

            db.Temp_Pass.Remove(temp_Pass);
            db.SaveChanges();

            return Ok(temp_Pass);
        }

        // POST: api/Temp_Pass
        [ResponseType(typeof(Temp_Pass))]
        public IHttpActionResult PostTemp_Pass(Temp_Pass temp_Pass)
        {
            
            string email = GetUserEmail(temp_Pass.Username);
            if (email==null)
            {
                return BadRequest("No se ha encontrado un usuario que quieres recuperar");
            } else
            {
                temp_Pass.State = "Espera";
                temp_Pass.Email = email;
                temp_Pass.Pin = GenerateRandomCode();
                temp_Pass.NewPass = "";

            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Temp_Pass.Add(temp_Pass);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Temp_PassExists(temp_Pass.Username))
                {
                    return BadRequest("Ya hemos enviado un pin de seguridad a tu correo");
                }
                else
                {
                    throw;
                }
            }
            correo(temp_Pass);

            return CreatedAtRoute("DefaultApi", new { id = temp_Pass.Username }, temp_Pass);
        }

        private void ChangePassword(Temp_Pass t)
        {
            var client = db.Clients.FirstOrDefault(e => e.Username == t.Username);
            if (client != null)
            {
                client.Password = t.NewPass;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw;
                }

            }
            var deliveryPerson = db.Delivery_Persons.FirstOrDefault(e => e.Username == t.Username);
            if (deliveryPerson != null)
            {
                deliveryPerson.Password = t.NewPass;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }




        private string GetUserEmail(string user)
        {

            var client = db.Clients.FirstOrDefault(e => e.Username == user);
            if (client != null)
            {
                return client.Email;
            }

            var deliveryPerson = db.Delivery_Persons.FirstOrDefault(e => e.Username == user);
            if (deliveryPerson != null)
            {
                return deliveryPerson.Email;
            }

            // Return null or an appropriate value if the user is not found in any collection
            return null;
        }

        private int GenerateRandomCode()
        {
            Random random = new Random();
            int code = random.Next(100000, 1000000); // Genera un número aleatorio de 6 dígitos
            return code;
        }

        // DELETE: api/Temp_Pass/5
        [ResponseType(typeof(Temp_Pass))]
        public IHttpActionResult DeleteTemp_Pass(string id)
        {
            Temp_Pass temp_Pass = db.Temp_Pass.Find(id);
            if (temp_Pass == null)
            {
                return NotFound();
            }

            db.Temp_Pass.Remove(temp_Pass);
            db.SaveChanges();

            return Ok(temp_Pass);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Temp_PassExists(string id)
        {
            return db.Temp_Pass.Count(e => e.Username == id) > 0;
        }


        static void correo(Temp_Pass t)
        {
            string correo = t.Email;
            int? pin = t.Pin;
            string spin = pin.ToString();
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
                Subject = "Código de Seguridad para cambio de contraseña",
                Body = "Parece que has olvidado tu contraseña, tu pin para reestablecerla es: " + spin +". Por favor ignora este mensaje si no solicitaste este cambio.",
                IsBodyHtml = true // Si el cuerpo del correo es HTML
            };

            // Agregar el destinatario
            mail.To.Add(correo);

            // Enviar el correo
            smtpClient.Send(mail);
            Console.WriteLine("Correo enviado exitosamente.");


        }
    }
}