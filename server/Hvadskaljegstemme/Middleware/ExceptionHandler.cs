namespace Hvadskaljegstemme.Middleware;

public class ExceptionHandler(RequestDelegate next, ILogger<ExceptionHandler> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandler> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var logEvent = context.Items["LogEvent"] as Dictionary<string, object>;

            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var error = new Dictionary<string, object>
            {
                ["ExceptionType"] = ex.GetType(),
                ["Message"] = $"Uncaught exception: {ex.Message}",
            };
            logEvent["Error"] = error;
        }
    }
}