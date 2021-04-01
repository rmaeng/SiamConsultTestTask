using Microsoft.AspNetCore.Mvc;
using OrderingAPI.Infrastructure.Repositories;
using OrderingAPI.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderingRepository _orderingRepository;

        public OrdersController(IOrderingRepository orderingRepository)
        {
            _orderingRepository = orderingRepository ?? throw new ArgumentNullException(nameof(orderingRepository));
        }

        [HttpGet]
        public async Task<ActionResult<List<SalesOrder>>> GetOrdersAsync()
        {
            return await _orderingRepository.GetOrdersAsync();
        }

        [HttpGet("{orderId:int}")]
        public async Task<ActionResult<SalesOrder>> GetOrderAsync(int orderId)
        {
            var order = await _orderingRepository.GetOrderAsync(orderId);
            if (order is null)
                return NotFound();

            return order;
        }

        [HttpGet]
        [Route("customers")]
        public async Task<ActionResult<List<Customer>>> GetCustomersAsync()
        {
            return await _orderingRepository.GetCustomersAsync();
        }

        [HttpGet]
        [Route("products")]
        public async Task<ActionResult<List<Product>>> GetProductsAsync()
        {
            return await _orderingRepository.GetProductsAsync();
        }

        [HttpGet]
        [Route("statuses")]
        public async Task<ActionResult<List<SalesStatus>>> GetSalesStatusesAsync()
        {
            return await _orderingRepository.GetSalesStatusesAsync();
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<SalesOrder> CreateOrder([FromBody] SalesOrder orderToCreate)
        {
            var order = _orderingRepository.CreateOrder(orderToCreate);
            return CreatedAtAction(nameof(GetOrderAsync), new { orderId = order.SalesOrderId }, order);
        }

        [HttpPost]
        [Route("update")]
        public ActionResult<SalesOrder> UpdateOrder([FromBody] SalesOrder orderToUpdate)
        {
            var order = _orderingRepository.UpdateOrder(orderToUpdate);
            return CreatedAtAction(nameof(GetOrderAsync), new { orderId = order.SalesOrderId }, order);
        }

        [HttpDelete("{orderId:int}")]
        public ActionResult<SalesOrder> DeleteOrder(int orderId)
        {
            var order = _orderingRepository.DeleteOrder(orderId);
            if (order is null)
                return NotFound();

            return Ok(order);
        }
    }
}
