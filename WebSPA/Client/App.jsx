import React, { useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import OrderDialog from './OrderDialog.jsx';

import { orderingApi } from './orderingApi.js';

export default function App() {
    const [salesOrders, setSalesOrders] = useState([]);

    const [isOrderDialogOpen, setIsOrderDialogOpen] = React.useState(false);
    const [lastOpenOrder, setLastOpenOrder] = useState();

    useEffect(() => {
        if (!isOrderDialogOpen) {
            orderingApi.getOrders()
                .then(res => setSalesOrders(res));
        }
    }, [isOrderDialogOpen]); 

    const openSalesOrderDialog = (salesOrder) => {
        setLastOpenOrder(salesOrder);
        setIsOrderDialogOpen(true);
    };

    const addOrUpdateOrder = (salesOrder) => {
        if (salesOrder) {
            if (salesOrder.salesOrderId) {
                orderingApi.updateOrder(salesOrder)
                    .then(() => setIsOrderDialogOpen(false));
            } else {
                orderingApi.createOrder(salesOrder)
                    .then(() => setIsOrderDialogOpen(false));
            }
        } else
            setIsOrderDialogOpen(false);
    };

    const deleteOrder = (salesOrder) => {
        orderingApi.deleteOrder(salesOrder.salesOrderId)
            .then(() => orderingApi.getOrders())
            .then(res => setSalesOrders(res));
    };

    return (
        <section>
            <Typography component="h1">
                <Box fontSize={20} textAlign="center" fontWeight="fontWeightBold">Заказы</Box>
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="center">Дата заказа</TableCell>
                        <TableCell align="center">Статус заказа</TableCell>
                        <TableCell align="center">Клиент</TableCell>
                        <TableCell align="center">Комментарий</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {salesOrders?.map((salesOrder, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">{salesOrder?.orderDate ? new Date(salesOrder.orderDate).toLocaleDateString() : ''}</TableCell>
                            <TableCell align="center">{salesOrder?.salesStatus?.name}</TableCell>
                            <TableCell align="center">{salesOrder?.customer?.name}</TableCell>
                            <TableCell align="center">{salesOrder?.comment}</TableCell>
                            <TableCell>
                                <Button onClick={() => openSalesOrderDialog(salesOrder)}>
                                    <EditIcon fontSize="small" />
                                </Button>
                                <Button onClick={() => deleteOrder(salesOrder)}>
                                    <DeleteIcon fontSize="small" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => openSalesOrderDialog({})} color="primary">
                <AddIcon fontSize="large" />
            </Button>
            <OrderDialog model={lastOpenOrder} open={isOrderDialogOpen} onClose={addOrUpdateOrder} />
        </section>
    );
}