import React, { useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import Datepicker from './Datepicker.jsx';
import OrderDetailDialog from './OrderDetailDialog.jsx'

import { orderingApiMock as orderingApi } from './orderingApiMock.js';

export default function OrderDialog(props) {
    const { onClose, open, model } = props;

    const [salesStatuses, setSalesStatuses] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [salesOrder, setSalesOrder] = useState(model);
    const [lastOpenOrderDetail, setLastOpenOrderDetail] = useState();
    const [isOrderDetailDialogOpen, setIsOrderDetailDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            var orderId = model?.salesOrderId;
            if (orderId) {
                orderingApi.getOrder(orderId)
                    .then(res => setSalesOrder(res));
            } else {
                setSalesOrder(model);
            }
        } else {
            setCustomers([]);
            setSalesStatuses([]);
        }
    }, [open]);

    const openOrderDetailDialog = (orderDetail) => {
        setLastOpenOrderDetail(orderDetail);
        setIsOrderDetailDialogOpen(true);
    };

    const addOrUpdateOrderDetail = (orderDetail) => {
        if (orderDetail) {
            let rows = salesOrder.details || [];

            let editedRowIndex = rows.indexOf(lastOpenOrderDetail);
            if (editedRowIndex !== -1) {
                rows[editedRowIndex] = orderDetail;
            } else {
                setSalesOrder({ ...salesOrder, details: [...rows, orderDetail] })
            }
        }

        setIsOrderDetailDialogOpen(false);
    };

    const deleteOrderDetail = (orderDetail) => {
        let rows = salesOrder.details || [];

        let deletingRowIndex = rows.indexOf(orderDetail);
        if (deletingRowIndex !== -1) {
            rows.splice(deletingRowIndex, 1);
            setSalesOrder({ ...salesOrder, details: [...rows] })
        }
    };

    const handleChange = (prop) => (event) => {
        setSalesOrder({ ...salesOrder, [prop]: event.target.value });
    };

    const handleValueChange = (prop) => (value) => {
        setSalesOrder({ ...salesOrder, [prop]: value });
    };

    return (
        <Dialog open={open} maxWidth="md">
            <DialogTitle>Заказ</DialogTitle>
            <DialogContent>
                <FormControl>
                    <Datepicker label="Дата заказа" initialValue={salesOrder?.orderDate} onValueChange={handleValueChange('orderDate')} />
                    <Autocomplete
                        renderInput={(params) => <TextField {...params} label="Статус заказа" />}
                        value={salesOrder?.salesStatus || null}
                        onChange={(event, value) => handleValueChange('salesStatus')(value)}
                        options={salesStatuses}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onOpen={() => {
                            if (salesStatuses.length === 0)
                                orderingApi.getSalesStatuses()
                                    .then(res => setSalesStatuses(res));
                        }}
                    />
                    <Autocomplete
                        renderInput={(params) => <TextField {...params} label="Клиент" />}
                        value={salesOrder?.customer || null}
                        onChange={(event, value) => handleValueChange('customer')(value)}
                        options={customers}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onOpen={() => {
                            if (customers.length === 0)
                                orderingApi.getCustomers()
                                    .then(res => setCustomers(res));
                        }}
                    />
                    <TextField label="Комментарий" value={salesOrder?.comment ?? ''} onChange={handleChange('comment')} />
                    <br />
                    <FormLabel>Позиции в заказе</FormLabel>
                    <br />
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="center">Продукт</TableCell>
                                    <TableCell align="center">Количество</TableCell>
                                    <TableCell align="center">Цена</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salesOrder?.details?.map((salesOrderDetail, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">{salesOrderDetail.product?.name}</TableCell>
                                        <TableCell align="center">{salesOrderDetail.orderQuantity}</TableCell>
                                        <TableCell align="center">{salesOrderDetail.unitPrice}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => openOrderDetailDialog(salesOrderDetail)}>
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            <Button onClick={() => deleteOrderDetail(salesOrderDetail)}>
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button onClick={() => openOrderDetailDialog({})}>Добавить</Button>
                        <OrderDetailDialog model={lastOpenOrderDetail} open={isOrderDetailDialogOpen} onClose={addOrUpdateOrderDetail} />
                    </TableContainer>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                    Отмена
                </Button>
                <Button onClick={() => onClose(salesOrder)} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}