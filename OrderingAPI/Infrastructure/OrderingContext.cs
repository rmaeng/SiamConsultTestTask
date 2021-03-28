using Microsoft.EntityFrameworkCore;
using OrderingAPI.Infrastructure.EntityConfigurations;
using OrderingAPI.Model;

namespace OrderingAPI.Infrastructure
{
    public class OrderingContext : DbContext
    {
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderDetail> SalesOrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<SalesStatus> SalesStatuses { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public OrderingContext(DbContextOptions<OrderingContext> options) : base(options)
        {
            if (Database.EnsureCreated())
            {
                var contextInitializer = new OrderingContextInitializer();
                contextInitializer.Seed(this);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfiguration(new SalesOrderEntityTypeConfiguration())
                .ApplyConfiguration(new SalesOrderDetailEntityTypeConfiguration())
                .ApplyConfiguration(new ProductEntityTypeConfiguration())
                .ApplyConfiguration(new SalesStatusEntityTypeConfiguration())
                .ApplyConfiguration(new CustomerEntityTypeConfiguration());
        }
    }
}
