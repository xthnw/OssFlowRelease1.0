import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Test = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="p-4">
            <h1 className="font-bold mb-4">Test DatePicker</h1>
            <DatePicker
                selected={date}
                onChange={setDate}
                className="px-2 py-1 border rounded"
            />
        </div>
    );
};