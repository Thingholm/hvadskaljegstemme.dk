using Hvadskaljegstemme.Data;
using Hvadskaljegstemme.Services;
using Hvadskaljegstemme.Models.Enums;
using Hvadskaljegstemme.Middleware;
using System.Text.Json;
using Serilog;
using Serilog.Formatting.Compact;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


string connectionString;
{
    var host = builder.Configuration["PostgresConnection:Host"];
    var port = builder.Configuration["PostgresConnection:Port"];
    var database = builder.Configuration["PostgresConnection:Database"];
    var username = builder.Configuration["PostgresConnection:Username"];
    var password = builder.Configuration["PostgresConnection:Password"];
    connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password}";
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString, o => o.MapEnum<Vote>("vote")).UseSnakeCaseNamingConvention()
);

builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .WriteTo.Console(new CompactJsonFormatter())
        .MinimumLevel.Information();
});

builder.Services.AddScoped<AnswerService>();

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    });


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseMiddleware<RequestLogger>();
app.UseMiddleware<ExceptionHandler>();

app.UseAuthorization();

app.MapControllers();

app.Run();
