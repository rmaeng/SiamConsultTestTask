namespace OrderingAPI.Model
{
    /// <summary>
    /// Продукт.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// Уникальный идентификатор продукта.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Наименование продукта.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Цена продукта.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Комментарий.
        /// </summary>
        public string Comment { get; set; }
    }
}
