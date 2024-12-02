import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export const Test = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="relative">
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                customInput={
                    <div className="relative">
                        <input
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pl-10"
                            value={date ? date.toLocaleDateString() : ''}
                            readOnly
                        />
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                }
            />
        </div>
    );
};
