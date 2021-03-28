using OrderingAPI.Model;
using System.Collections.Generic;

namespace OrderingAPI.Infrastructure
{
    public class OrderingContextInitializer
    {
        public void Seed(OrderingContext context)
        {
            context.Products.AddRange(GetPreconfiguredProducts());
            context.Customers.AddRange(GetPreconfiguredCustomers());
            context.SalesStatuses.AddRange(GetPreconfiguredSalesStatuses());

            context.SaveChanges();
        }

        private IEnumerable<Product> GetPreconfiguredProducts()
        {
            return new List<Product>()
            {
                new Product() { Name = "1С:Деньги 8", Price = 600m, Comment = "Настоящая домашняя бухгалтерия. Идеальное решение для всех, кто хочет взять под контроль свои деньги и обрести финансовую независимость." },
                new Product() { Name = "1С:Договорчики 8. Базовая версия", Price = 4600m, Comment = "Вся договорная работа в одном месте" },
                new Product() { Name = "1С:Управление нашей фирмой 8. Базовая версия. Электронная поставка", Price = 4600m, Comment = "«1С:УНФ» - это готовая программа для малого бизнеса с продуманным функционалом. Имеющиеся в ней шаблоны действий и автоматизация процессов требуют минимум знаний для работы и экономят время." },
                new Product() { Name = "1С:Предприятие 8. Клиентская лицензия на 10 рабочих мест. Электронная поставка", Price = 8200m, Comment = "Электронная поставка" },
                new Product() { Name = "Kaspersky Total Security для бизнеса. Тип Cross-grade. 250-499 лицензий.", Price = 1650m, Comment = "Kaspersky Total Security для бизнеса. Тип Cross-grade. Цена действительна при покупке от 250 до 499 лицензий, цена указана за одну лицензию." }
            };
        }

        private IEnumerable<Customer> GetPreconfiguredCustomers()
        {
            return new List<Customer>()
            {
                new Customer() { Name = "ООО «РусТрансКом»" },
                new Customer() { Name = "ООО «ТрансЛес»" },
                new Customer() { Name = "Компания «ЛП Транс»" },
                new Customer() { Name = "ООО «Грузовая компания»" },
                new Customer() { Name = "LOVE RADIO" }
            };
        }

        private IEnumerable<SalesStatus> GetPreconfiguredSalesStatuses()
        {
            return new List<SalesStatus>()
            {
                new SalesStatus() { Name = "Новый" },
                new SalesStatus() { Name = "Ждет оплаты" },
                new SalesStatus() { Name = "Готов к выдаче" },
                new SalesStatus() { Name = "Завершен" },
                new SalesStatus() { Name = "Отменен" }
            };
        }
    }
}
