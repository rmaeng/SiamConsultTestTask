import React, { useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Datepicker from './Datepicker.jsx';

import { orderingApi } from './orderingApi.js';

export default function OrderDetailDialog(props) {
    const { onClose, open, model } = props;

    const [products, setProducts] = useState([]);
    const [salesOrderDetail, setSalesOrderDetail] = useState(model);

    useEffect(() => {
        if (open) {
            setSalesOrderDetail(model);
        } else {
            setProducts([]);
        }
    }, [open]);

    const handleChange = (prop) => (event) => {
        setSalesOrderDetail({ ...salesOrderDetail, [prop]: event.target.value });
    };

    const handleValueChange = (prop) => (value) => {
        setSalesOrderDetail({ ...salesOrderDetail, [prop]: value });
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Позиция в заказе</DialogTitle>
            <DialogContent>
                <FormControl>
                    <Autocomplete
                        renderInput={(params) => <TextField label="Продукт" {...params} />}
                        value={salesOrderDetail?.product || null}
                        onChange={(event, value) => handleValueChange('product')(value)}
                        options={products}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.productId === value.productId}
                        onOpen={() => {
                            if (products.length === 0)
                                orderingApi.getProducts()
                                    .then(res => setProducts(res))
                        }}
                    />
                    <TextField label="Количество" type="number" value={salesOrderDetail?.orderQuantity ?? ''} onChange={handleChange('orderQuantity')} />
                    <TextField label="Цена" type="number" value={salesOrderDetail?.unitPrice ?? ''} onChange={handleChange('unitPrice')} />
                    <Datepicker label="Дата изменения" initialValue={salesOrderDetail?.modifyDate} onValueChange={handleValueChange('modifyDate')} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>
                    Отмена
                </Button>
                <Button onClick={() => onClose(salesOrderDetail)}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}