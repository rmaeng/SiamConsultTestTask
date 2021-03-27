using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderingAPI.Model;

namespace OrderingAPI.Infrastructure.EntityConfigurations
{
    public class SalesStatusEntityTypeConfiguration : IEntityTypeConfiguration<SalesStatus>
    {
        public void Configure(EntityTypeBuilder<SalesStatus> builder)
        {
            builder.ToTable("SalesStatus");

            builder.HasKey(ss => ss.SalesStatusId);

            builder.Property(ss => ss.Name)
                .IsRequired()
                .HasMaxLength(2000);
        }
    }
}
