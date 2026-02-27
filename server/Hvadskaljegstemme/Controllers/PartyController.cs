using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Data;
using Hvadskaljegstemme.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("api/parties")]
public class PartyController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpGet]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<IEnumerable<Party>>> GetParties()
    {
        var parties = await _db.Parties.ToListAsync();
        return Ok(parties);
    }

}

