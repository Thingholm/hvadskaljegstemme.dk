using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Common;
using Hvadskaljegstemme.Data;
using Hvadskaljegstemme.Models;
using Hvadskaljegstemme.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("answers")]
public class AnswerController(AnswerService answerService) : ControllerBase
{
    private readonly AnswerService _answerService = answerService;

    [HttpPost]
    public async Task<ActionResult> PostAnswer(List<Answer> answers)
    {
        var result = await _answerService.PostAnswer(answers);
        if (!result.IsSuccess)
        {
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

