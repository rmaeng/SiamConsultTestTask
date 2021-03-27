using System;
using System.Collections.Generic;

namespace OrderingAPI.Model
{
    /// <summary>
    /// Заказ.
    /// </summary>
    public class SalesOrder
    {
        /// <summary>
        /// Уникальный идентификатор заказа.
        /// </summary>
        public int SalesOrderId { get; set; }

        /// <summary>
        /// Дата заказа.
        /// </summary>
        public DateTime OrderDate { get; set; }

        /// <summary>
        /// Статус заказа.
        /// </summary>
        public SalesStatus SalesStatus { get; set; }

        /// <summary>
        /// Клиент.
        /// </summary>
        public Customer Customer { get; set; }

        /// <summary>
        /// Комментарий.
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// Позиции в заказе.
        /// </summary>
        public ICollection<SalesOrderDetail> Details { get; set; }
    }
}
