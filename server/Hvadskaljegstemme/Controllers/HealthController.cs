using Microsoft.AspNetCore.Mvc;

namespace Hvadskaljegstemme.Controllers;

[ApiController]
[Route("health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public ActionResult HealthCheck()
    {
        return Ok();
    }
}