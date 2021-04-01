using Microsoft.EntityFrameworkCore;
using OrderingAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingAPI.Infrastructure.Repositories
{
    public class OrderingRepository : IOrderingRepository
    {
        private readonly OrderingContext _orderingContext;

        public OrderingRepository(OrderingContext orderingContext)
        {
            _orderingContext = orderingContext ?? throw new ArgumentNullException(nameof(orderingContext));
        }

        public Task<List<SalesStatus>> GetSalesStatusesAsync()
        {
            return _orderingContext.SalesStatuses.ToListAsync();
        }

        public Task<List<Customer>> GetCustomersAsync()
        {
            return _orderingContext.Customers.ToListAsync();
        }

        public Task<List<Product>> GetProductsAsync()
        {
            return _orderingContext.Products.ToListAsync();
        }

        public Task<List<SalesOrder>> GetOrdersAsync()
        {
            return _orderingContext.SalesOrders
                .Include(x => x.Customer)
                .Include(x => x.SalesStatus)
                .ToListAsync();
        }

        public Task<SalesOrder> GetOrderAsync(int orderId)
        {
            return _orderingContext.SalesOrders
                .Include(x => x.Customer)
                .Include(x => x.SalesStatus)
                .Include(x => x.Details).ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.SalesOrderId == orderId);
        }

        public SalesOrder CreateOrder(SalesOrder orderToCreate)
        {
            _orderingContext.Attach(orderToCreate);

            _orderingContext.SalesOrders.Add(orderToCreate);

            _orderingContext.SaveChanges();

            return orderToCreate;
        }

        public SalesOrder UpdateOrder(SalesOrder orderToUpdate)
        {
            _orderingContext.Attach(orderToUpdate);

            _orderingContext.Update(orderToUpdate);
            UpdateSalesOrderDetailCollection();

            _orderingContext.SaveChanges();

            return orderToUpdate;

            void UpdateSalesOrderDetailCollection()
            {
                var entries = _orderingContext.ChangeTracker.Entries<SalesOrderDetail>();
                foreach (var entry in entries)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            _orderingContext.SalesOrderDetails.Add(entry.Entity);
                            break;

                        case EntityState.Unchanged:
                            _orderingContext.SalesOrderDetails.Update(entry.Entity);
                            break;
                    }
                }

                var existingDetailIds = _orderingContext.SalesOrders.AsNoTracking()
                    .Where(so => so.SalesOrderId == orderToUpdate.SalesOrderId)
                    .SelectMany(so => so.Details)
                    .Select(so => so.Id)
                    .ToList();

                foreach (var existingDetailId in existingDetailIds)
                {
                    if (orderToUpdate.Details.Any(detail => detail.Id == existingDetailId))
                        continue;

                    _orderingContext.SalesOrderDetails.Remove(new SalesOrderDetail() { Id = existingDetailId });
                }
            }
        }

        public SalesOrder DeleteOrder(int orderId)
        {
            var order = _orderingContext.SalesOrders.SingleOrDefault(x => x.SalesOrderId == orderId);
            if (order is null)
                return null;

            _orderingContext.SalesOrders.Remove(order);
            _orderingContext.SaveChanges();

            return order;
        }
    }
}