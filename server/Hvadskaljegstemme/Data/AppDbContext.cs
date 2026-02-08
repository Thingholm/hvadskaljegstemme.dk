using Hvadskaljegstemme.Models;
using Hvadskaljegstemme.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Bill> Bills { get; set; }

    public DbSet<Party> Parties { get; set; }

    public DbSet<PartyVote> PartyVotes { get; set; }

    public DbSet<UserAnswer> UserAnswers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<Vote>();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}