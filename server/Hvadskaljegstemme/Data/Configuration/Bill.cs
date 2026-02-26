using Hvadskaljegstemme.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hvadskaljegstemme.Data.Configuration;

public class BillConfiguration : IEntityTypeConfiguration<Bill>
{
    public void Configure(EntityTypeBuilder<Bill> builder)
    {
        builder.Property(pv => pv.BillType).HasColumnType("bill_type");
    }
}