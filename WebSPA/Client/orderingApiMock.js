import cloneDeep from 'lodash/clonedeep';

export const orderingApiMock = (function () {
    const salesStatuses = [
        { id: 1, name: 'Новый' },
        { id: 2, name: 'Ждет оплаты' },
        { id: 3, name: 'Готов к выдаче' },
        { id: 4, name: 'Завершен' },
        { id: 5, name: 'Отменен' }
    ];

    const customers = [
        { id: 1, name: 'ООО «РусТрансКом»' },
        { id: 2, name: 'ООО «ТрансЛес»' },
        { id: 3, name: 'Компания «ЛП Транс»' },
        { id: 4, name: 'ООО «Грузовая компания»' },
        { id: 5, name: 'LOVE RADIO' }
    ];

    const products = [
        { productId: 1, name: "1С:Деньги 8", price: 600, comment: "Настоящая домашняя бухгалтерия. Идеальное решение для всех, кто хочет взять под контроль свои деньги и обрести финансовую независимость." },
        { productId: 2, name: "1С:Договорчики 8. Базовая версия", price: 4600, comment: "Вся договорная работа в одном месте" },
        { productId: 3, name: "1С:Управление нашей фирмой 8. Базовая версия. Электронная поставка", price: 4600, comment: "«1С:УНФ» - это готовая программа для малого бизнеса с продуманным функционалом. Имеющиеся в ней шаблоны действий и автоматизация процессов требуют минимум знаний для работы и экономят время." },
        { productId: 4, name: "1С:Предприятие 8. Клиентская лицензия на 10 рабочих мест. Электронная поставка", price: 8200, comment: "Электронная поставка" },
        { productId: 5, name: "Kaspersky Total Security для бизнеса. Тип Cross-grade. 250-499 лицензий.", price: 1650, comment: "Kaspersky Total Security для бизнеса. Тип Cross-grade. Цена действительна при покупке от 250 до 499 лицензий, цена указана за одну лицензию." }
    ];

    var orders = [
        {
            salesOrderId: 1,
            orderDate: new Date(),
            salesStatus: {
                id: 2,
                name: "Ждет оплаты"
            },
            customer: {
                id: 2,
                name: "ООО «ТрансЛес»"
            },
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            details: [
                {
                    id: 1,
                    product: { productId: 1, name: '1С:Деньги 8', price: 600, comment: 'Nulla in ex nisi' },
                    orderQuantity: 1,
                    unitPrice: 1000,
                    modifyDate: new Date()
                },
                {
                    id: 2,
                    product: { productId: 4, name: '1С:Предприятие 8. Клиентская лицензия на 10 рабочих мест. Электронная поставка', price: 8200, comment: 'Sed ac condimentum quam' },
                    orderQuantity: 1,
                    unitPrice: 1500,
                    modifyDate: new Date()
                }
            ],
        },
        {
            salesOrderId: 2,
            orderDate: new Date(),
            salesStatus: {
                id: 2,
                name: "Ждет оплаты"
            },
            customer: {
                id: 2,
                name: "ООО «ТрансЛес»"
            },
            comment: "Fusce nisl erat, hendrerit a luctus sit amet, varius in ligula.",
            details: [
                {
                    id: 3,
                    product: { productId: 5, name: 'Kaspersky Total Security для бизнеса. Тип Cross-grade. 250-499 лицензий.', price: 1650 },
                    orderQuantity: 2,
                    unitPrice: 2000,
                    modifyDate: new Date()
                },
                {
                    id: 4,
                    product: { productId: 2, name: '1С:Договорчики 8. Базовая версия', price: 4600 },
                    orderQuantity: 1,
                    unitPrice: 2500,
                    modifyDate: new Date()
                }
            ],
        }
    ];

    var numerator = Math.max(...orders.map(o => o.salesOrderId));

    return {
        getCustomers: () => new Promise((resolve) => {
            console.log('getCustomers');
            console.log(customers);
            resolve(customers);
        }),
        getSalesStatuses: () => new Promise((resolve) => {
            console.log('getSalesStatuses');
            console.log(salesStatuses);
            resolve(salesStatuses);
        }),
        getProducts: () => new Promise((resolve) => {
            console.log('getProducts');
            console.log(products);
            resolve(products);
        }),
        getOrders: () => new Promise((resolve) => {
            console.log('getOrders');
            console.log(orders);
            resolve([...orders]);
        }),
        getOrder: (salesOrderId) => new Promise((resolve, reject) => {
            console.log(`getOrder ${salesOrderId}`);
            let order = orders.find(o => o.salesOrderId === salesOrderId);
            console.log(order);
            if (!order)
                reject(`Не удалось найти заказ с идентификатором '${salesOrderId}'`);

            resolve(cloneDeep(order));
        }),
        createOrder: (salesOrder) => new Promise((resolve) => {
            console.log('addOrder');
            console.log(salesOrder);
            orders.push({ ...salesOrder, salesOrderId: ++numerator });
            resolve(numerator);
        }),
        updateOrder: (salesOrder) => new Promise((resolve, reject) => {
            console.log('updateOrder');
            console.log(salesOrder);
            let editedOrderIndex = orders.findIndex(o => o.salesOrderId === salesOrder.salesOrderId);
            if (editedOrderIndex === -1)
                reject(`Не удалось найти заказ с идентификатором '${salesOrder.salesOrderId}'`);

            orders[editedOrderIndex] = salesOrder;
            resolve();
        }),
        deleteOrder: (salesOrderId) => new Promise((resolve, reject) => {
            console.log(`deleteOrder ${salesOrderId}`);
            var deletingOrderIndex = orders.findIndex(o => o.salesOrderId === salesOrderId);
            if (deletingOrderIndex === -1)
                reject(`Не удалось найти заказ с идентификатором '${salesOrderId}'`);

            orders.splice(deletingOrderIndex, 1);
            resolve();
        })
    };
})();