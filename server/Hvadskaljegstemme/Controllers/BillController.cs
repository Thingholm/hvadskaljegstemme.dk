using Hvadskaljegstemme.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("api/bills")]
public class BillController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Bill>>> GetQuestions()
    {
        var bills = await _db.Bills.Include(b => b.PartyVotes).ToListAsync();
        var billDtos = bills.Select(b => new Dtos.Bill(
            b.Id,
            b.BillTag,
            b.Title,
            b.Description,
            b.Question,
            b.ForExplanation,
            b.AgainstExplanation,
            b.Url,
            b.IsPassed,
            b.PartyVotes.Select(pv => new Dtos.PartyVote(pv.PartyId, pv.Vote))
        ));
        return Ok(billDtos);
    }

}

