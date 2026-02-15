using System.Diagnostics;

namespace Hvadskaljegstemme.Middleware;

public class RequestLogger(RequestDelegate next, ILogger<RequestLogger> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<RequestLogger> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        var request = context.Request;
        var method = request.Method;
        var path = request.Path;

        var logEvent = new Dictionary<string, object>
        {
            ["Method"] = request.Method,
            ["Path"] = request.Path.Value ?? "",
            ["Protocol"] = request.Protocol,
            ["Scheme"] = request.Scheme,
            ["Host"] = request.Host.Value ?? "",
            ["QueryString"] = request.QueryString.Value ?? "",
            ["RequestId"] = context.TraceIdentifier,
            ["DeploymentId"] = Environment.GetEnvironmentVariable("DEPLOYMENT_ID") ?? "unknown"
        };

        context.Items["LogEvent"] = logEvent;

        var stopwatch = Stopwatch.StartNew();

        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();
            logEvent["StatusCode"] = context.Response.StatusCode;
            logEvent["ContentType"] = context.Response.ContentType ?? "";
            logEvent["ElapsedMilliseconds"] = stopwatch.ElapsedMilliseconds;
            _logger.LogInformation("{@LogEvent}", logEvent);
        }
    }
}