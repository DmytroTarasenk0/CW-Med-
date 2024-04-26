using CW.Models;
using Microsoft.AspNetCore.Mvc;

namespace CW.Controllers
{
    [Route("/api/[controller]")]
    public class PatientController : Controller
    {
        private static List<Patient> patients = new List<Patient>(new[]
        {
            new Patient() { Id = 1, Name = "James", Sex = "Male", YearOB = 2000, Symptoms = new List<string>(new[] {"Cured"} ) },
            new Patient() { Id = 2, Name = "Sara", Sex = "Female", YearOB = 1990, Symptoms = new List<string>(new[] {"Cured"} ) }
        });

        [HttpGet]
        public IEnumerable<Patient> Get() => patients;

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var patient = patients.SingleOrDefault(p => p.Id == id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            patients.Remove(patients.SingleOrDefault( p => p.Id == id ));
            return Ok("Deleted");
        }

        private int NextId => patients.Count() == 0 ? 1 : patients.Max(x => x.Id) + 1;

        [HttpGet("GetNextId")]
        public int GetNextId() => NextId;

        [HttpPost]
        public IActionResult Post(Patient patient)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            patient.Id = NextId;
            patients.Add(patient);
            return CreatedAtAction( nameof(Get), new { id = patient.Id }, patient );
        }

        [HttpPut]
        public IActionResult Put(Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var patched_patient = patients.SingleOrDefault(p => p.Id == patient.Id);
            if (patched_patient == null) 
                return NotFound();
            patched_patient.Name = patient.Name;
            patched_patient.Sex = patient.Sex;
            patched_patient.YearOB = patient.YearOB;
            patched_patient.Symptoms = patient.Symptoms;
            return Ok(patched_patient);
        }
    }
}
