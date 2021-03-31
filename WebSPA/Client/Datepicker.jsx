import React, { useState, useEffect } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import { noop } from './utils.js';

export default function Datepicker(props) {
    const { label, initialValue = null, format = 'dd.MM.yyyy', onValueChange = noop } = props;

    const [selectedDate, setSelectedDate] = useState(initialValue);

    useEffect(() => {
        setSelectedDate(initialValue);
    }, [initialValue]);

    const handleDateChange = (date) => {  
        setSelectedDate(date);
        onValueChange(date);
    };

    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    format={format}
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
        </React.Fragment>
    );
}
