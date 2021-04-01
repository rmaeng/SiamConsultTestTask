using OrderingAPI.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingAPI.Infrastructure.Repositories
{
    public interface IOrderingRepository
    {
        Task<List<SalesStatus>> GetSalesStatusesAsync();

        Task<List<Customer>> GetCustomersAsync();

        Task<List<Product>> GetProductsAsync();

        Task<List<SalesOrder>> GetOrdersAsync();

        Task<SalesOrder> GetOrderAsync(int orderId);

        SalesOrder CreateOrder(SalesOrder order);

        SalesOrder DeleteOrder(int orderId);

        SalesOrder UpdateOrder(SalesOrder order);
    }
}