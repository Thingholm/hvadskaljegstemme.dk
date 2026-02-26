using Hvadskaljegstemme.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hvadskaljegstemme.Data.Configuration;

public class PartyConfiguration : IEntityTypeConfiguration<PartyVote>
{
    public void Configure(EntityTypeBuilder<PartyVote> builder)
    {
        builder.Property(pv => pv.Vote).HasColumnType("vote");
    }
}