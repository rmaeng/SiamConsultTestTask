using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderingAPI.Model;

namespace OrderingAPI.Infrastructure.EntityConfigurations
{
    public class SalesOrderEntityTypeConfiguration : IEntityTypeConfiguration<SalesOrder>
    {
        public void Configure(EntityTypeBuilder<SalesOrder> builder)
        {
            builder.ToTable("SalesOrder");

            builder.HasKey(so => so.SalesOrderId);

            builder.Property(so => so.OrderDate)
                .IsRequired()
                .HasColumnType("datetime");

            builder.HasOne(so => so.SalesStatus).WithMany().IsRequired();
            builder.HasOne(so => so.Customer).WithMany().IsRequired();

            builder.Property(so => so.Comment).HasMaxLength(2000);
        }
    }
}
