using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Common;
using Hvadskaljegstemme.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("api/answers")]
public class AnswerController(AnswerService answerService, ILogger<AnswerController> logger) : ControllerBase
{
    private readonly AnswerService _answerService = answerService;
    private readonly ILogger<AnswerController> _logger = logger;

    [HttpPost]
    public async Task<ActionResult> PostAnswer([FromBody] List<Answer> answers)
    {
        var result = await _answerService.PostAnswer(answers);
        if (!result.IsSuccess)
        {
            _logger.LogError("Error posting answer: {ErrorMessage}", result.Error.Message);

            return result.Error switch
            {
                ValidationError => BadRequest(),
                DBError => StatusCode(500),
                _ => StatusCode(500),
            };
        }

        return Ok();
    }
}

