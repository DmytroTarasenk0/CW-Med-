using Microsoft.AspNetCore.Mvc;
using CW.Client;
using System.Threading.Tasks;
using CW.Models;
using Newtonsoft.Json;

namespace CW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueInfoController : ControllerBase
    {
        private readonly IssueInfoClient _issueInfoClient;

        public IssueInfoController(IssueInfoClient issueInfoClient)
        {
            _issueInfoClient = issueInfoClient;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssueInfo(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var issueInfoJson = await _issueInfoClient.GetIssueInfo(id);
            var issueInfo = JsonConvert.DeserializeObject<IssueInfo>(issueInfoJson);
            return Ok(issueInfo);
        }
    }
}
