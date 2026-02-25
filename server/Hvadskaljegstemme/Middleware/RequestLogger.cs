using System.Diagnostics;

namespace Hvadskaljegstemme.Middleware;

public class RequestLogger(RequestDelegate next, ILogger<RequestLogger> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<RequestLogger> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        using (_logger.BeginScope(new Dictionary<string, object>
        {
            ["RequestId"] = context.TraceIdentifier,
        }))
        {
            await _next(context);
        }
    }
}