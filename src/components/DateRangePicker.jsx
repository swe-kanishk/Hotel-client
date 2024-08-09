import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangePicker = ({ setCheckIn , setCheckOut }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  setCheckIn(state[0].startDate)
  setCheckOut(state[0].endDate)
  const bookedDates = [
    new Date(2024, 6, 15), // July 15, 2024
    new Date(2024, 6, 20), // July 20, 2024
    new Date(2024, 6, 25)  // July 25, 2024
  ];

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      dayContentRenderer={(date) => {
        if (isDateBooked(date)) {
          return <div style={{ textDecoration: 'line-through', color: 'red' }}>{date.getDate()}</div>;
        }
        return <div>{date.getDate()}</div>;
      }}
    />
  );
}

export default DateRangePicker;
