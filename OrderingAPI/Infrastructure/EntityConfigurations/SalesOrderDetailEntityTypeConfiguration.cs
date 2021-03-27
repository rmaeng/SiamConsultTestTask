using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderingAPI.Model;

namespace OrderingAPI.Infrastructure.EntityConfigurations
{
    public class SalesOrderDetailEntityTypeConfiguration : IEntityTypeConfiguration<SalesOrderDetail>
    {
        public void Configure(EntityTypeBuilder<SalesOrderDetail> builder)
        {
            builder.ToTable("SalesOrderDetail");

            builder.HasKey(sod => sod.Id);
            
            builder.HasOne<SalesOrder>().WithMany(so => so.Details).IsRequired();
            builder.HasOne(sod => sod.Product).WithMany().IsRequired();

            builder.Property(sod => sod.OrderQuantity).IsRequired();

            builder.Property(sod => sod.ModifyDate)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(sod => sod.UnitPrice)
                .IsRequired()
                .HasColumnType("money");
        }
    }
}
