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
            var existingOrder = _orderingContext.SalesOrders
                .Include(x => x.Customer)
                .Include(x => x.SalesStatus)
                .Include(x => x.Details).ThenInclude(x => x.Product)
                .FirstOrDefault(so => so.SalesOrderId == orderToUpdate.SalesOrderId);

            if (existingOrder is null)
                return null;

            _orderingContext.Entry(existingOrder).CurrentValues.SetValues(orderToUpdate);

            UpdateCustomer();
            UpdateSalesStatus();
            UpdateSalesOrderDetailCollection();

            _orderingContext.SaveChanges();

            return orderToUpdate;

            void UpdateCustomer()
            {
                if (!_orderingContext.Customers.Local.Any(c => c.CustomerId == orderToUpdate.Customer.CustomerId))
                    _orderingContext.Attach(orderToUpdate.Customer);

                existingOrder.Customer = _orderingContext.Customers.Local.First(c => c.CustomerId == orderToUpdate.Customer.CustomerId);
            }

            void UpdateSalesStatus()
            {
                if (!_orderingContext.SalesStatuses.Local.Any(s => s.SalesStatusId == orderToUpdate.SalesStatus.SalesStatusId))
                    _orderingContext.Attach(orderToUpdate.SalesStatus);

                existingOrder.SalesStatus = _orderingContext.SalesStatuses.Local.First(s => s.SalesStatusId == orderToUpdate.SalesStatus.SalesStatusId);
            }

            void UpdateSalesOrderDetailCollection()
            {
                const int UndefinedDetailId = 0;

                foreach (var detail in orderToUpdate.Details)
                {
                    if (!_orderingContext.Products.Local.Any(p => p.ProductId == detail.Product.ProductId))
                        _orderingContext.Attach(detail.Product);

                    if (detail.Id == UndefinedDetailId)
                    {
                        existingOrder.Details.Add(detail);
                    }
                    else
                    {
                        var existingDetail = existingOrder.Details.First(sod => sod.Id == detail.Id);

                        _orderingContext.Entry(existingDetail).CurrentValues.SetValues(detail);

                        existingDetail.Product = _orderingContext.Products.Local.First(p => p.ProductId == detail.Product.ProductId);
                    }
                }

                foreach (var existingDetail in existingOrder.Details)
                {
                    if (!orderToUpdate.Details.Any(sod => sod.Id == existingDetail.Id))
                        _orderingContext.Remove(existingDetail);
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