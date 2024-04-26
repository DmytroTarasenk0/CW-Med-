using Microsoft.AspNetCore.Mvc;
using CW.Client;
using CW.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosisController : ControllerBase
    {
        private readonly DiagnosisClient _diagnosisClient;

        public DiagnosisController(DiagnosisClient diagnosisClient)
        {
            _diagnosisClient = diagnosisClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetDiagnosis([FromQuery] List<int> symptoms, [FromQuery] string sex, [FromQuery] int year)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diagnosisResult = await _diagnosisClient.GetDiagnosis(symptoms, sex, year);
            var diagnoses = JsonConvert.DeserializeObject<List<Diagnosis>>(diagnosisResult);
            return Ok(diagnoses);
        }
    }
}
