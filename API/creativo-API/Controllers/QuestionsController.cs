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
    public class QuestionsController : ApiController
    {
        private creativoDBEntity db = new creativoDBEntity();

        // GET: api/Questions
        public IQueryable<Question> GetQuestions()
        {
            return db.Questions;
        }

        // GET: api/Questions/5
        [ResponseType(typeof(Question))]
        public IHttpActionResult GetQuestion(int id)
        {
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutQuestion(int id, Question question)
        {
            if (AnyAttributeEmpty(question))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (question.Question1?.Length > 250)
            {
                return BadRequest("La pregunta ha superado los 250 Caracteres");
            }

            if (question.Answer?.Length > 250)
            {
                return BadRequest("La respuesta ha superado los 250 Caracteres");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.IdQuestion)
            {
                return BadRequest();
            }

            db.Entry(question).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return BadRequest("No se ha encontrado la Pregunta");
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Questions
        [ResponseType(typeof(Question))]
        public IHttpActionResult PostQuestion(Question question)
        {
            if (AnyAttributeEmpty(question))
            {
                return BadRequest("Hay espacios en blanco");
            }

            if (question.Question1?.Length > 250)
            {
                return BadRequest("La pregunta ha superado los 250 Caracteres");
            }

            if (question.Answer?.Length > 250)
            {
                return BadRequest("La respuesta ha superado los 250 Caracteres");
            }



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Questions.Add(question);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = question.IdQuestion }, question);
        }

        // DELETE: api/Questions/5
        [ResponseType(typeof(Question))]
        public IHttpActionResult DeleteQuestion(int id)
        {
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return NotFound();
            }

            db.Questions.Remove(question);
            db.SaveChanges();

            return Ok(question);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuestionExists(int id)
        {
            return db.Questions.Count(e => e.IdQuestion == id) > 0;
        }

        private bool AnyAttributeEmpty(Question question)
        {
            // Verificar cada propiedad del objeto Question
            // Devolver true si alguna propiedad es una cadena vacía, de lo contrario, devolver false
            return string.IsNullOrEmpty(question.Question1) ||
                   string.IsNullOrEmpty(question.Answer);
        }

        

    }
}