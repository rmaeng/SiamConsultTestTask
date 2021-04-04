using System;

namespace OrderingAPI.Model
{
    /// <summary>
    /// Позиция в заказе.
    /// </summary>
    public class SalesOrderDetail
    {
        /// <summary>
        /// Уникальный идентификатор позиции.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// <see cref="Product"/>
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Продукт.
        /// </summary>
        public Product Product { get; set; }

        /// <summary>
        /// Количество.
        /// </summary>
        public int OrderQuantity { get; set; }

        /// <summary>
        /// Цена по прайсу на момент формирования заказа.
        /// </summary>
        public decimal UnitPrice { get; set; }

        /// <summary>
        /// Дата изменения.
        /// </summary>
        public DateTime ModifyDate { get; set; }
    }
}
