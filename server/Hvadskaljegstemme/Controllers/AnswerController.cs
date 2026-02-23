using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Common;
using Hvadskaljegstemme.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("api/answers")]
public class AnswerController(AnswerService answerService) : ControllerBase
{
    private readonly AnswerService _answerService = answerService;

    [HttpPost]
    public async Task<ActionResult> PostAnswer([FromBody] List<Answer> answers)
    {
        var result = await _answerService.PostAnswer(answers);
        if (!result.IsSuccess)
        {
            var logEvent = HttpContext.Items["LogEvent"] as Dictionary<string, object>;
            var errorDict = new Dictionary<string, object>
            {
                ["Type"] = result.Error.GetType().Name,
                ["Message"] = result.Error.Message
            };
            logEvent["Error"] = errorDict;
            switch (result.Error)
            {
                case ValidationError:
                    return BadRequest();
                case DBError:

                    return StatusCode(500);
                default:
                    return StatusCode(500);
            }
        }

        return Ok();
    }
}

