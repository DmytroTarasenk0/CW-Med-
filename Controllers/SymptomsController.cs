using Microsoft.AspNetCore.Mvc;
using CW.Client;
using System.Threading.Tasks;
using CW.Models;

namespace CW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SymptomController : ControllerBase
    {
        private readonly SymptomClient _symptomClient;

        public SymptomController(SymptomClient symptomClient)
        {
            _symptomClient = symptomClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetSymptoms()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var symptoms = await _symptomClient.GetSymptoms();
            return Ok(symptoms);
        }
    }
}
