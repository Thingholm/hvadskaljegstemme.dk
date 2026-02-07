using Hvadskaljegstemme.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hvadskaljegstemme.Data.Configuration;

public class UserAnswerConfiguration : IEntityTypeConfiguration<UserAnswer>
{
    public void Configure(EntityTypeBuilder<UserAnswer> builder)
    {
        builder.Property(ua => ua.AnsweredAt).HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
    }
}