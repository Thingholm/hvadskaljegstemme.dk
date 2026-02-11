using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Data;
using Hvadskaljegstemme.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("answers")]
public class AnswerController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpPost]
    public async Task<ActionResult> PostAnswer(List<Answer> answers)
    {
        var billIds = await _db.Bills.Select(b => b.Id).ToListAsync();
        var answerIds = answers.Select(a => a.BillId).ToList();
        if (billIds.Count != answers.Count || billIds.Except(answerIds).Any())
        {
            return BadRequest();
        }

        var userAnswers = answers.Select(a => new UserAnswer
        {
            UserId = a.UserId,
            BillId = a.BillId,
            Vote = a.Vote,
        }).ToList();

        userAnswers.ForEach(ua => _db.UserAnswers.Add(ua));
        var rows_added = 0;
        try
        {
            rows_added = await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

        if (rows_added != billIds.Count)
        {
            return StatusCode(500);
        }

        return Ok();
    }
}

