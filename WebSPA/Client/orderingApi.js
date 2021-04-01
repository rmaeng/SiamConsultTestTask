export const orderingApi = (function () {
    const baseURL = 'https://localhost:44352';

    return {
        getCustomers: () => {
            return fetch(baseURL + '/api/orders/customers')
                .then(res => res.json());
        },
        getSalesStatuses: () => {
            return fetch(baseURL + '/api/orders/statuses')
                .then(res => res.json());
        },
        getProducts: () => {
            return fetch(baseURL + '/api/orders/products')
                .then(res => res.json());
        },
        getOrders: () => {
            return fetch(baseURL + '/api/orders')
                .then(res => res.json());
        },
        getOrder: (salesOrderId) => {
            return fetch(baseURL + `/api/orders/${salesOrderId}`)
                .then(res => res.json());
        },
        createOrder: (salesOrder) => {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(salesOrder)
            }

            return fetch(baseURL + '/api/orders/create', request)
                .then(res => res.json());
        },
        updateOrder: (salesOrder) => {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(salesOrder)
            }

            return fetch(baseURL + '/api/orders/update', request)
                .then(res => res.json());
        },
        deleteOrder: (salesOrderId) => {
            const request = {
                method: 'DELETE'
            }

            return fetch(baseURL + `/api/orders/${salesOrderId}`, request)
                .then(res => res.json());
        }
    };
})();