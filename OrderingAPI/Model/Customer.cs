namespace OrderingAPI.Model
{
    /// <summary>
    /// Клиент.
    /// </summary>
    public class Customer
    {
        /// <summary>
        /// Уникальный идентификатор клиента.
        /// </summary>
        public int CustomerId { get; set; }

        /// <summary>
        /// Наименование клиента.
        /// </summary>
        public string Name { get; set; }
    }
}
