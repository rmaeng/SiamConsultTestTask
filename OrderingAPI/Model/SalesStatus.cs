namespace OrderingAPI.Model
{
    /// <summary>
    /// Статус заказа.
    /// </summary>
    public class SalesStatus
    {
        /// <summary>
        /// Уникальный идентификатор статуса заказа.
        /// </summary>
        public int SalesStatusId { get; set; }

        /// <summary>
        /// Название статуса.
        /// </summary>
        public string Name { get; set; }
    }
}
